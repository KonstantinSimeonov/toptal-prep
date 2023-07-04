// https://leetcode.com/problems/regular-expression-matching/description/

struct Solution {}

#[derive(Debug)]
enum RegToken {
    Letter(u8),
    LetterMany(u8),
    Any,
    AnyMany,
}

impl RegToken {
    pub fn from_str(s: &str) -> Vec<RegToken> {
        let bytes = s.as_bytes();
        let mut i = 0;
        let mut tokens = vec![];
        while i < s.len() {
            let t = match (bytes[i], bytes.get(i + 1).unwrap_or(&0)) {
                (b'.', b'*') => {
                    i += 2;
                    RegToken::AnyMany
                }
                (b'.', _) => {
                    i += 1;
                    RegToken::Any
                }
                (x, b'*') => {
                    i += 2;
                    RegToken::LetterMany(x)
                }
                (x, _) => {
                    i += 1;
                    RegToken::Letter(x)
                }
            };

            tokens.push(t);
        }

        tokens
    }
}

impl Solution {
    pub fn is_match(s: String, p: String) -> bool {
        let bytes = s.as_bytes();
        let tokens = RegToken::from_str(&p);
        let mut tab = vec![vec![false; s.len() + 1]; tokens.len() + 1];

        tab[0][0] = true;

        for i in 1..tab.len() {
            tab[i][0] = tab[i - 1][0] && match tokens[i - 1] {
                RegToken::AnyMany | RegToken::LetterMany(_) => true,
                _ => false
            };

            for j in 1..tab[i].len() {
                tab[i][j] = match tokens[i - 1] {
                    RegToken::Any => tab[i - 1][j - 1],
                    RegToken::AnyMany => tab[i - 1][j - 1] || tab[i - 1][j] || tab[i][j - 1],
                    RegToken::Letter(x) => tab[i - 1][j - 1] && x as u8 == bytes[j - 1],
                    RegToken::LetterMany(x) =>
                        // match or continue matching
                        ((tab[i][j - 1] || tab[i - 1][j - 1]) && x as u8 == bytes[j - 1])
                        // zero matches
                        || tab[i - 1][j]
                }
            }
        }

        *tab.last().unwrap().last().unwrap()
    }
}

// leaving this here as a testament to my stupidity
fn is_match_rec(ts: &Vec<RegToken>, s: &str, it: usize, is: usize) -> bool {
    let bytes = s.as_bytes();
    if it >= ts.len() {
        return is == s.len();
    }

    match ts[it] {
        RegToken::Letter(x) => {

            if bytes.iter().skip(is).take(1).any(|&c| c == x) {
                is_match_rec(ts, s, it + 1, is + 1)
            } else {
                false
            }
        }
        RegToken::LetterMany(x) => {
            let mut xs = bytes.iter().skip(is).take_while(|&&c| c == x).zip(is + 1..);
            is_match_rec(ts, s, it + 1, is) || xs.any(|(_, new_is)| is_match_rec(ts, s, it + 1, new_is))
        }
        RegToken::Any => {
            is_match_rec(ts, s, it + 1, is + 1)
        },
        RegToken::AnyMany => {
            let mut xs = s
                .chars()
                .skip(is)
                .zip(is + 1..);

            is_match_rec(ts, s, it + 1, is) || xs.any(|(_, new_is)| is_match_rec(ts, s, it + 1, new_is))
        }
    }
}

fn main() {
    for (s, p) in [
        ("aa", "a"),
        ("aa", "a*"),
        ("ab", ".*"),
        ("aaaaabb", "a.*abb"),
        ("aaaabb", "a*bb"),
        ("aaabbba", "a*b*a"),
        ("aaabbba", ".*aa"),
        ("aaa", "ab*a"),
        ("a", "ab*"),
        ("a", ".*..a*"),
        ("ab", ".*..")
    ] {
        let ts = RegToken::from_str(p);
        println!("\n{} {} {:?}", s, p, ts);
        let expected = is_match_rec(&ts, s, 0, 0);
        let actual = Solution::is_match(s.to_string(), p.to_string());
        println!(
            "result: {}, passes: {}",
            actual,
            actual == expected
        )
    }
}

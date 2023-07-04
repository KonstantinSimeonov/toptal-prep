// https://leetcode.com/problems/regular-expression-matching/description/

struct Solution {}

#[derive(Debug)]
enum RegToken {
    Letter(char),
    LetterMany(char),
    Any,
    AnyMany,
}

impl RegToken {
    pub fn from_str(s: &str) -> Vec<RegToken> {
        let cs = s.chars().collect::<Vec<_>>();
        let mut i = 0;
        let mut tokens = vec![];
        while i < s.len() {
            let t = match (cs[i], cs.get(i + 1).unwrap_or(&'_')) {
                ('.', '*') => {
                    i += 2;
                    RegToken::AnyMany
                }
                ('.', _) => {
                    i += 1;
                    RegToken::Any
                }
                (x, '*') => {
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

fn test(ts: &Vec<RegToken>, s: &str, it: usize, is: usize) -> bool {
    //println!("called {} {}", it, is);
    if it >= ts.len() {
        //println!("return");
        return is == s.len();
    }

    match ts[it] {
        RegToken::Letter(x) => {

            if s.chars().skip(is).take(1).any(|c| c == x) {
                //println!(
                //   "Letter => {} {}",
                //   it + 1,
                //   is + 1
                //);
                test(ts, s, it + 1, is + 1)
            } else {
                //println!("Letter => failed");
                false
            }
        }
        RegToken::LetterMany(x) => {
            let mut xs = s.chars().skip(is).take_while(|c| *c == x).zip(is + 1..);

            //println!("Letter Many => {:?} {:?}", (it + 1, is), xs.clone().collect::<Vec<_>>());

            test(ts, s, it + 1, is) || xs.any(|(_, new_is)| test(ts, s, it + 1, new_is))
        }
        RegToken::Any => {
            //println!("Any => {} {}", it + 1, is + 1);
            test(ts, s, it + 1, is + 1)
        },
        RegToken::AnyMany => {
            let mut xs = s
                .chars()
                .skip(is)
                .zip(is + 1..);

            //println!("AnyMany => {} {:?}", it, xs.clone().collect::<Vec<_>>());

            test(ts, s, it + 1, is) || xs.any(|(_, new_is)| test(ts, s, it + 1, new_is))
        }
    }
}

impl Solution {
    pub fn is_match(s: String, p: String) -> bool {
        let ts = RegToken::from_str(&p);
        test(&ts, &s, 0, 0)
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
        println!("\n\n{} {} {:?}", s, p, RegToken::from_str(p));
        println!(
            "{}",
            Solution::is_match(s.to_string(), p.to_string())
        )
    }
}

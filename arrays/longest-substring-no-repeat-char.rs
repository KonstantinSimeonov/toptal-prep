// https://leetcode.com/problems/longest-substring-without-repeating-characters/submissions/983853692/

struct Solution {}

struct BitSet128 {
    set: i128,
    len: usize
}

impl BitSet128 {
    fn insert(&mut self, value: u8) {
        self.set |= 1 << value;
        self.len += 1;
    }

    fn remove(&mut self, value: u8) {
        self.set &= !(1 << value);
        self.len -= 1;
    }

    fn contains(&self, value: u8) -> bool {
        self.set & (1 << value) != 0
    }
}

impl Solution {
    pub fn length_of_longest_substring(s: String) -> i32 {
        if s.is_empty() {
            return 0;
        }

        let bytes = s.into_bytes();
        let mut max: usize = 0;
        let mut chars = BitSet128 { set: 0, len: 0 };
        chars.insert(bytes[0]);

        let mut start = 0;
        let mut current = 1;

        while current < bytes.len() {
            max = std::cmp::max(max, chars.len);
            while chars.contains(bytes[current]) && start < current {
                chars.remove(bytes[start]);
                start += 1;
            }

            chars.insert(bytes[current]);
            current += 1;
        }

        std::cmp::max(max, chars.len) as i32
    }
}

fn main() {
    let tests = ["abcabcbb", "bbbbb", "pwwkew", "apwkeaazdrls"];
    for t in tests {
        println!(
            "{} {}",
            t,
            Solution::length_of_longest_substring(t.to_string())
        )
    }
}

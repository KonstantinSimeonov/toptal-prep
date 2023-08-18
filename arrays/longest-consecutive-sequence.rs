// https://leetcode.com/problems/longest-consecutive-sequence/

struct Solution {}

impl Solution {
    pub fn longest_consecutive(nums: Vec<i32>) -> i32 {
        use std::collections::HashSet;

        let numset = nums.into_iter().collect::<HashSet<_>>();
        let mut max = 0;

        for n in numset.iter() {
            if !numset.contains(&(n - 1)) {
                max = max.max((*n..).take_while(|x| numset.contains(x)).count());
            }
        }

        max as i32
    }
}

fn main() {
    let tests = [
        vec![100, 4, 200, 1, 3, 2],
        vec![0, 3, 7, 2, 5, 8, 4, 6, 0, 1],
        vec![0, 0, -1],
        vec![9, 1, 4, 7, 3, -1, 0, 5, 8, -1, 6],
    ];

    for t in tests.iter() {
        let mut sorted = t.clone();
        sorted.sort();
        println!("{:?} {:?}", t.clone(), sorted);

        println!("{}", Solution::longest_consecutive(t.clone()));
        println!("======");
    }
}

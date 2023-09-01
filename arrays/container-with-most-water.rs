// https://leetcode.com/problems/container-with-most-water/description/
struct Solution {}

impl Solution {
    pub fn max_area(height: Vec<i32>) -> i32 {
        let mut m = 0;

        let mut left = 0;
        let mut right = height.len() - 1;

        while left < right {
            let hl = height[left];
            let hr = height[right];
            let area = hl.min(hr) * (right - left) as i32;

            m = m.max(area);

            if hl > hr {
                right -= 1;
            } else {
                left += 1;
            }
        }

        m
    }
}

fn main() {
    let tests = vec![
        (vec![1, 8, 6, 2, 5, 4, 8, 3, 7], 49),
        (vec![1, 1], 1),
        (vec![2, 1, 4], 4),
        (vec![1, 1, 2, 1], 3),
    ];

    for (t, expected) in tests.into_iter() {
        let result = Solution::max_area(t);
        println!("result: {}, correct: {}", result, result == expected)
    }
}

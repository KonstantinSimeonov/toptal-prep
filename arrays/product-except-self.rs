struct Solution {}

impl Solution {
    pub fn product_except_self(nums: Vec<i32>) -> Vec<i32> {
        let mut ans: Vec<i32> = vec![0; nums.len()];
        let mut acc = 1;
        for i in 0..nums.len() {
            ans[i] = acc;
            acc *= nums[i];
        }

        acc = 1;
        for i in (0..nums.len()).rev() {
            ans[i] *= acc;
            acc *= nums[i];
        }

        ans
    }
}

fn main() {
    let tests = [
        vec![1, 2, 3, 4],
        vec![-1, 1, 0, -3, 3]
    ];

    for t in tests.iter() {
        println!("{:?}", Solution::product_except_self(t.to_vec()))
    }
}

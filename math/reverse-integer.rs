// https://leetcode.com/problems/reverse-integer/
use std::convert::TryFrom;

fn reverse(x: i32) -> i32 {
    let mut n: i64 = x.into();
    let mut res = 0;
    while n != 0 {
        res = res * 10 + n % 10;
        n /= 10;
    }

    i32::try_from(res).unwrap_or(0)
}

fn main() {
    for i in -30..30 {
        println!("{} {}", i, reverse(i));
    }
}

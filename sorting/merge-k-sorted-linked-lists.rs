// https://leetcode.com/problems/merge-k-sorted-lists/description/
use std::cmp;
use std::collections::BinaryHeap;
use std::fmt;

impl cmp::PartialOrd for ListNode {
    fn partial_cmp(&self, other: &Self) -> Option<cmp::Ordering> {
        Some(self.val.cmp(&other.val))
    }
}

impl cmp::Ord for ListNode {
    fn cmp(&self, other: &Self) -> cmp::Ordering {
        self.partial_cmp(other).unwrap()
    }
}

impl Solution {
    pub fn merge_k_lists(lists: Vec<Option<Box<ListNode>>>) -> Option<Box<ListNode>> {
        let mut heap = lists
            .into_iter()
            .filter_map(|node| node.map(|l| cmp::Reverse(l)))
            .collect::<BinaryHeap<_>>();

        let mut head = match heap.pop() {
            Some(node) => {
                let ListNode { val, next } = *node.0;
                if let Some(rest) = next {
                    heap.push(cmp::Reverse(rest));
                }

                Box::new(ListNode::new(val))
            }
            None => return None,
        };

        let mut tail = &mut head;

        while let Some(x) = heap.pop() {
            if let Some(rest) = x.0.next {
                heap.push(cmp::Reverse(rest));
            }

            tail.next = Some(Box::new(ListNode::new(x.0.val)));
            tail = tail.next.as_mut().unwrap()
        }

        Some(head)
    }
}

fn main() {
    let tests = vec![
        vec![
            ListNode::from_vec(&vec![3, 5]),
            ListNode::empty(),
            ListNode::from_vec(&vec![2, 4, 8]),
            ListNode::from_vec(&vec![10]),
        ],
        vec![
            ListNode::from_vec(&vec![1, 4, 5]),
            ListNode::from_vec(&vec![1, 3, 4]),
            ListNode::from_vec(&vec![2, 6]),
        ],
        vec![ListNode::empty(), ListNode::empty(), ListNode::empty()],
        vec![
            ListNode::empty(),
            ListNode::empty(),
            ListNode::from_vec(&vec![1]),
            ListNode::empty(),
            ListNode::empty(),
        ],
    ];

    for t in tests.into_iter() {
        println!("result: {:?}", Solution::merge_k_lists(t));
    }
}

struct Solution {}

#[derive(PartialEq, Eq, Clone)]
pub struct ListNode {
    pub val: i32,
    pub next: Option<Box<ListNode>>,
}

impl ListNode {
    #[inline]
    fn new(val: i32) -> Self {
        ListNode { next: None, val }
    }

    #[inline]
    fn from_vec(vec: &Vec<i32>) -> Option<Box<ListNode>> {
        if let Some(last) = vec.last() {
            vec.iter().rev().skip(1).fold(
                Some(Box::new(ListNode {
                    val: *last,
                    next: None,
                })),
                |next, val| Some(Box::new(ListNode { val: *val, next })),
            )
        } else {
            None
        }
    }

    #[inline]
    fn empty() -> Option<Box<ListNode>> {
        None
    }
}

impl fmt::Debug for ListNode {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        let r1 = write!(f, "{}", self.val);
        match &self.next {
            Some(x) => r1.and(write!(f, " -> ")).and(x.fmt(f)),
            None => Result::Ok(()),
        }
    }
}

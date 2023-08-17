// https://leetcode.com/problems/valid-sudoku/submissions/

struct Solution {}

impl Solution {
    pub fn is_valid_sudoku(board: Vec<Vec<char>>) -> bool {
        let squares_it = (0..9)
            .step_by(3)
            .flat_map(|row| (0..9).step_by(3).map(move |col| (row, col, 3, 3)));
        let rows_it = (0..9).map(|row| (row, 0, 1, 9));
        let cols_it = (0..9).map(|col| (0, col, 9, 1));

        let mut ranges = squares_it.chain(rows_it).chain(cols_it);

        let is_valid = ranges.all(|(start_r, start_c, len_r, len_c)| {
            let mut set = 0;
            for r in start_r..(start_r + len_r) {
                for c in start_c..(start_c + len_c) {
                    let bit = (1 << (board[r][c] as u8 - 46)) & !1;
                    if set & bit != 0 {
                        return false;
                    }

                    set |= bit;
                }
            }
            return true;
        });

        is_valid
    }
}

fn main() {
    let board = vec![
        vec!['5', '3', '.', '.', '7', '.', '.', '.', '.'],
        vec!['6', '.', '.', '1', '9', '5', '.', '.', '.'],
        vec!['.', '9', '8', '.', '.', '.', '.', '6', '.'],
        vec!['8', '.', '.', '.', '6', '.', '.', '.', '3'],
        vec!['4', '.', '.', '8', '.', '3', '.', '.', '1'],
        vec!['7', '.', '.', '.', '2', '.', '.', '.', '6'],
        vec!['.', '6', '.', '.', '.', '.', '2', '8', '.'],
        vec!['.', '.', '.', '4', '1', '9', '.', '.', '5'],
        vec!['.', '.', '.', '.', '8', '.', '.', '7', '9'],
    ];

    //let board2 = vec![
    //    vec!['8', '3', '.', '.', '7', '.', '.', '.', '.'],
    //    vec!['6', '.', '.', '1', '9', '5', '.', '.', '.'],
    //    vec!['.', '9', '8', '.', '.', '.', '.', '6', '.'],
    //    vec!['8', '.', '.', '.', '6', '.', '.', '.', '3'],
    //    vec!['4', '.', '.', '8', '.', '3', '.', '.', '1'],
    //    vec!['7', '.', '.', '.', '2', '.', '.', '.', '6'],
    //    vec!['.', '6', '.', '.', '.', '.', '2', '8', '.'],
    //    vec!['.', '.', '.', '4', '1', '9', '.', '.', '5'],
    //    vec!['.', '.', '.', '.', '8', '.', '.', '7', '9'],
    //];

    println!(
        "{}",
        Solution::is_valid_sudoku(board),
        //Solution::is_valid_sudoku(board2)
    )
}

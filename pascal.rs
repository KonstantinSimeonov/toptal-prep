// find the n-th row in a pascal triangle, zero-based
fn main() {
    let row_index = 3;
    let mut row = vec![1];

    for i in (1..row_index + 1) {
        let mut carry = row[0];
        for x in row.iter_mut().skip(1) {
            let tmp = *x;
            *x += carry;
            carry = tmp;
        }

        row.push(1)
    }

    println!("{:?}", row)
}

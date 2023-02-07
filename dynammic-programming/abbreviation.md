This problem is a little twist on the longest common subsequence problem (it's a good idea to develop an understanding of that before trying to solve this problem). Let our strings be `a` and `b`. To arrive at a dynammic programming solution, we can consider whether we can build substrings of `b` out of substrings of `a`. We need to only consider substrings which start at position 0 in both strings. Let's explore that for `a = aaBcd` and `b = ABC`. The substrings for `a` are `''` (empty string), `a`, `aa`, `aaB`, `aaBc`, `aaBcd` and the substrings for `b` are `''` (empty string), `A`, `AB`, `ABC`. Let's put this in a table:

The rows represent substrings of `a` and the columns - substrings of `b`. The cell at coords `(i, j)` represents whether we can build the substring `b[0:j]` out the substring `a[0:i]`.

|   | j  | 0  | 1 | 2 | 3 |
|:-:|:--:|:--:|:-:|:-:|:-:|
| i |    | '' | A | B | C |
| 0 | '' | 1  | 0 | 0 | 0 |
| 1 | a  | 1  | 1 | 0 | 0 |
| 2 | a  | 1  | 1 | 0 | 0 |
| 3 | B  | 0  | 0 | 1 | 0 |
| 4 | c  | 0  | 0 | 0 | 1 |
| 5 | d  | 0  | 0 | 0 | 1 |

Let's look at examples from the table:
- `(0, 0)` = `('', '')` - we can build an empty string from an empty string (always true)
- `(1, 0)` = `(a, '')` - we can build an empty string from the substring `a`, because it is lowercase and we can skip it
- `(0, 1)` = `('', A)` - we cannot build the substring `A` out of the empty string
- `(1, 1)` = `(a, A)` - we can build `A` from `a` by making `a` uppercase
- `(2, 1)` = `(aa, A)` - we can build `A` from `aa` by skipping one `a` and capitalizing the other `a`
- `(3, 0)` = `(aaB, '')` - we cannot build an empty string from `aaB`, because even though we can remove `a`s, we cannot remove `B`
- `(4, 0)` = `(aaBc, '')` - we cannot build an empty string from `aaBc`, because even though we can remove `a`s and the `c`, we cannot remove `B`
- `(3, 1)` = `(aaB, A)` - false, we cannot remove `B`

Consider another angle - how do we calculate the value of `(3, 3)`? The letter in string `a` is `c`, while the letter in string `b` is `C`. They can be made equal by capitalizing `c`. This means that if the value of `(2, 2)` is true (`b[0:2]` can be built from `a[0:2]`), then we can also build `b[0:3]` from `a[0:3]`. In this case, we need to look for the answer for `(i - 1, j - 1)`. But this is only one of four cases:

1. the current letters are both uppercase and equal (`a[i - 1] == b[j - 1]`) - if `(i - 1, j - 1)` is true, we can build `(i, j)` as well
    - examples above: `(2, 2)`
    - the answer is in the top left diagonal cell, because we're considering the substrings without both the current letters
1. the current letter of `a` can be capitalized to equal the letter of `b` (`is_lower(a[i - 1]) && to_upper(a[i - 1]) == b[j - 1]`)
    - if `(i - 1, j - 1)` is true, we can build `(i, j)` by capitalizing `a[i - 1]`
      - examples above: `(1, 1)`, `(4, 3)`
    - there is another option - we can also skip `a[i - 1]`, in which case we're looking at whether we can build `b[0:j]` from `a[0:i - 1]`, which is the value at `(i - 1, j)`. So if either `(i - 1, j - 1)` or `(i - 1, j)` are true, so is `(i, j)`
      - example above: `(2, 1)`
    - the answer the the top left diagonal cell or the cell to the top, because we're considering 1. the substrings without both letters or 2. the same substring of `b` and the substring of `a` without the current lowercase letter
1. the current letters are both uppercase and not equal (`!is_lower(a[i - 1]) && a[i - 1] != b[j - 1]`) - it's always false, because we cannot remove `a[i - 1]` or make it equal to `b[i - 1]`
    - example above: `(3, 1)` or `(3, 3)`
1. the current letter of `a` is lowercase, but not equal to `b[j - 1]` (`is_lower(a[i -1]) && to_upper(a[i - 1]) !== b[j - 1]`) - we can omit this letter and look for the answer at `(i - 1, j)`
    - example above: `(4, 2)`, `(2, 2)`, `(5, 3)`
    - the answer is in the cell above, since that's the substring of `a` without the current lowercase letter

The answer for the whole of `a` and `b` is the bottom rightmost cell of the table. The time complexity of this approach is `O(len(a) * len(b))`. The space complexity can be `O(len(a) * len(b))`, but can be optimized to `O(len(b))`, because we ever only need the previous row of answers.

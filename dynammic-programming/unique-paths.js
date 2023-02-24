// https://leetcode.com/problems/unique-paths/description/

/**
 * @param {number} m
 * @param {number} n
 * @returns {number}
 */
const uniquePaths = (m, n) => {
  let prev_row = new Uint32Array(n).fill(1)
  let current_row = new Uint32Array(n)
  
  for (let i = 1; i < m; ++i) {
    current_row[0] = 1
    for (let j = 1; j < n; ++j) {
      current_row[j] = prev_row[j] + current_row[j - 1]
    }

    [prev_row, current_row] = [current_row, prev_row]
  }

  return prev_row[n - 1]
}

const tests = [
  [3, 7],
  [3, 2],
  [1, 1],
  [1, 2],
  [2, 2],
]

for (const args of tests) {
  console.log(uniquePaths(...args))
}

/**
 * @param {number[]} xs
 * @returns {number}
 */
const lilysHomework = xs => {
  const sorted = new Uint32Array(xs).sort()
  const asc_swaps = solve(xs, sorted)
  sorted.reverse()
  const desc_swaps = solve(xs, sorted)
  return Math.min(asc_swaps, desc_swaps)
}

/**
 * @param {number[]} xs
 * @param {Uint32Array} sorted
 * @returns {number}
 */
const solve = (xs, sorted) => {
  const ys = new Uint32Array(xs)
  const map = {}
  for (let i = 0; i < sorted.length; ++i)
    map[sorted[i]] = i

  let swaps = 0
  for (let i = 0; i < ys.length; ++i) {
    while (ys[i] !== sorted[i]) {
      const xpos = map[ys[i]]
      ;[ys[i], ys[xpos]] = [ys[xpos], ys[i]]
      ++swaps
    }
  }

  return swaps
}

console.log(
  lilysHomework([7, 15, 12, 3]), // 2
  lilysHomework([2, 5, 3, 1]), // 2
  lilysHomework([9, 1, 2, 7, 3]), // 3
  lilysHomework([2, 1]) // 0
)

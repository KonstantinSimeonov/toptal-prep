// https://www.hackerrank.com/challenges/equal/problem
const equal = xs => {
  const min = Math.min(...xs)

  const { rest, fives } = xs.reduce(
    (mem, x) => {
      x -= min
      mem.fives += (x / 5) | 0
      ++mem.rest[x % 5]

      return mem
    },
    { rest: new Uint32Array(5), fives: 0 }
  )

  // 1 op for 1s and 2s, 2 ops for 3s, 2 ops for 4s
  let a = rest[1] + rest[2] + 2 * rest[3] + 2 * rest[4]
  // add 2 to everything - 1 op for 2s, 2 ops for 3s, 2 ops for 4s, 1 op for 5s, 2 ops for 6s
  let b = rest[0] + 2 * rest[1] + 2 * rest[2] + rest[3] + 2 * rest[4]
  // add 1 to everything - 1 op for 1s, 1 op for 2s, 2 ops for 3s, 2 ops for 4s, 1 op for 5s
  let c = rest[0] + rest[1] + 2 * rest[2] + 2 * rest[3] + rest[4]

  const res = fives + Math.min(a, b, c)
  return res
}

console.log(
  equal([2, 2, 3, 7]),
  equal([1, 5, 5])
)

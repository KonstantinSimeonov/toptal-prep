// 1st problem of https://www.youtube.com/shorts/NTCRFASmSlA
const solve = (xs, ys) => {
  const map = {}
  for (let i = 0; i < xs.length; ++i) {
    let x = xs[i]
    let y = ys[i]
    if (!map[x]) {
      map[x] = {}
    }

    map[x][i] = true

    if (!map[y]) {
      map[y] = {}
    }

    map[y][i] = true
  }

  for (let i = 1; i <= 100_000; ++i) {
    let blocks = Object.keys(map[i] || {})
    let can_pass = blocks.every(b => xs[b] !== i || ys[b] !== i)

    if (can_pass) {
      return i
    }
  }

  return 100_001
}

;[
  [[1, 2, 4, 3], [1, 3, 2, 3]],
  [[3, 2, 1, 6, 5], [4, 2, 1, 3, 3]],
  [[1, 2, 3], [1, 1, 3]],
  [
    Array.from({ length: 100_000 - 1 }, (_, i) => i + 1),
    Array.from({ length: 100_000 - 1 }, (_, i) => i + 1),
  ]
].forEach((args, i) => {
  console.log(i, args)
  console.log(solve(...args))
})

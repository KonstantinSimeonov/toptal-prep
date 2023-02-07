const knapsack = (W, ws, cs) => {
  const table = Array.from(
    { length: ws.length + 1 },
    () => Array.from({ length: W + 1 }, () => 0)
  )

  for (let i = 1; i <= ws.length; ++i) {
    for (let j = 1; j <= W; ++j) {
      const w = ws[i - 1]
      table[i][j] = Math.max(
        w <= j ? table[i - 1][j - w] + cs[i - 1] : 0,
        table[i - 1][j]
      )
    }
  }

  return table
}

const backtrack = (table, ws, cs) => {
  let i = table.length - 1
  let j = table[i].length - 1

  let ans = []
  while (i > 0) {
    if (table[i][j] === table[i - 1][j]) {
      --i
      continue
    }

    ans.push([ws[i - 1], cs[i - 1]])
    j -= ws[i - 1]
  }

  return ans
}

const krec = (w, n, ws, cs) => {
  if (n === ws.length || w <= 0) return 0

  const res = Math.max(
    ws[n] <= w ? cs[n] + krec(w - ws[n], n + 1, ws, cs) : 0,
    krec(w, n + 1, ws, cs)
  )

  return res
}

const p = tab => tab.map(r => r.map(s => String(s).padStart(2, ` `)).join(` `)).join(`\n`)

console.log(
  p(knapsack(10, [6, 2, 5], [7, 3, 8])),
  krec(10, 0, [6, 2, 5], [7, 3, 8]),
)

const t = knapsack(11, [2, 3, 3, 4, 5, 6], [1, 2, 5, 1, 2, 7])
console.log(p(t))
console.log(backtrack(t, [2, 3, 3, 4, 5, 6], [1, 2, 5, 1, 2, 7]))

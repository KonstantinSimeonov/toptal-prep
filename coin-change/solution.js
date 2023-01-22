// https://www.hackerrank.com/challenges/coin-change/problem

const solve = (n, xs) => {
  const ans = Array.from({ length: 301 }, () => 0)
  ans[0] = 1

  for (const x of xs) {
    for (let i = 0; i < n; ++i) {
        ans[i + x] += ans[i]
    }
  }

  return ans[n]
}

console.log(
  solve(4, [1, 2, 3]),
  solve(10, [2, 5, 3, 6])
)

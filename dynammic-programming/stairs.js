// https://leetcode.com/problems/climbing-stairs/
const climbStairs = n => {
  const ways = Array.from({ length: n + 2 }, () => 0)

  ways[0] = 1
  ways[1] = 1

  for (let i = 2; i <= n; ++i) {
    ways[i] = ways[i - 1] + ways[i - 2]
  }

  return ways[n]
}

console.log(climbStairs(3))

// https://www.hackerrank.com/challenges/construct-the-array/problem
const mod = BigInt(Math.pow(10, 9) + 7)

const solve = (n, k, x) => {
  let ex = BigInt(x === 1 ? 0 : 1)
  const pow = BigInt(k - 1);
  let P = pow
  for (let i = 1; i < n - 1; ++i) {
    ex = P - ex
    P *= pow
  }

  return String(ex % mod)
}

console.log(solve(5, 3, 2))

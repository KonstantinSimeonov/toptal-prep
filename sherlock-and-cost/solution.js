// https://www.hackerrank.com/challenges/sherlock-and-cost/problem
const cost = xs => {
  let taken = 0
  let not_taken = 0

  for (let i = 1; i < xs.length; ++i) {
    const new_not_taken = Math.max(
      not_taken,
      taken + Math.abs(xs[i - 1] - 1)
    )

    const new_taken = Math.max(
      not_taken + Math.abs(xs[i] - 1),
      taken + Math.abs(xs[i] - xs[i - 1])
    )

    ;[taken, not_taken] = [new_taken, new_not_taken]
  }

  return Math.max(taken, not_taken)
}

console.log(cost([1, 2, 3]))
console.log(cost([10, 1, 10, 1, 10]))
console.log(cost([100, 2, 100, 2, 100]))

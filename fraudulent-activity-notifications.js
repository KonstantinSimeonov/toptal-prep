// https://www.hackerrank.com/challenges/fraudulent-activity-notifications/problem

/**
 * @param {number[]} xs
 * @param {number} d
 * @returns {number}
 */
const activityNotifications = (xs, d) => {
  const freqs = new Uint32Array(201)
  for (let i = 0; i < d; ++i)
    ++freqs[xs[i]]

  const left_mid = (d + 1) >> 1
  const right_mid = left_mid + 1
  let result = 0
  for (let i = d; i < xs.length; ++i) {
    let j = -1
    let count = 0
    while (count < left_mid) {
      count += freqs[++j]
    }

    const left = j

    if (d % 2 === 0) {
      while (count < right_mid) {
        count += freqs[++j]
      }
    }

    if (xs[i] >= j + left) {
      ++result
    }

    freqs[xs[i]] = (freqs[xs[i]] | 0) + 1
    --freqs[xs[i - d]]
  }

  return result
}

console.log(activityNotifications([10, 20, 30, 40, 50, 20], 3))
console.log(activityNotifications([10, 20, 30, 40, 51, 20], 4))
console.log(activityNotifications([10, 20, 30, 40, 50, 120], 2))
console.log(activityNotifications([10, 20, 80, 6, 87, 120], 2))

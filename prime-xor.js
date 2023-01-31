// https://www.hackerrank.com/challenges/prime-xor/problem

const sieve = (() => {
  const primes = Array.from({ length: 1 << 13 }, () => true)
  primes[0] = false
  primes[1] = false
  for (let i = 2; i < primes.length; ++i) {
    if (primes[i]) {
      for (let j = 2 * i; j < primes.length; j += i) {
        primes[j] = false
      }
    }
  }

  return primes
})()

const MOD = 10 ** 9 + 7

/**
 * @param {number[]} nums
 * @returns {number}
 */
const primeXor = nums => {
  const counts = Array.from({ length: 4501 }, () => 0)
  for (const n of nums) {
    ++counts[n]
  }

  let range = Array.from({ length: 1 << 13  }, () => 0)
  range[0] = 1

  for (let i = 3500; i <= 4500; ++i) {
    if (counts[i] === 0) continue

    const new_range = range.slice()
    for (let j = 0; j <= 1 << 13; ++j) {
      new_range[j] += range[j] * (counts[i] >> 1)
      new_range[j] %= MOD
      new_range[j ^ i] += range[j] * ((counts[i] + 1) >> 1)
      new_range[j ^ i] %= MOD
    }

    range = new_range
  }

  let sum = 0
  for (let i = 0; i < range.length; ++i) {
    if (sieve[i]) {
      sum += range[i]
      sum %= MOD
    }
  }

  return sum
}

console.log(primeXor([3511, 3671, 4153]))
console.log(primeXor([3511, 3511, 3511]))
console.log(primeXor([2, 2, 3]))
console.log(primeXor([6, 1, 3]))

// https://leetcode.com/problems/maximum-product-subarray/description/

const DBG = false
const log = (...args) => DBG && console.log(...args)

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const split_by_0 = nums => {
  /** @type {number[][]} */
  const result = [[]]

  for (let i = 0; i < nums.length; ++i) {
    const last = result[result.length - 1]

    if (nums[i] === 0) {
      if (last.length > 0) {
        result.push([])
      }

      continue
    }

    last.push(nums[i])
  }

  if (result[result.length - 1].length === 0) result.pop()

  return result
}

/**
 * @param {number[]} xs
 * @param {number} s
 * @param {number} e
 * @return {number}
 */
const sub_product = (xs, s = 0, e = xs.length) => {
  if (s === e) return -Infinity

  let prod = 1
  for (let i = s; i < e; ++i)
    prod *= xs[i]

  return prod
}

/**
 * @param {number[]} nums
 * @return {[number, number]}
 */

const find_negs = xs => {
  let left = -1
  for (let i = 0; i < xs.length; ++i) {
    if (xs[i] < 0) {
      left = i
      break
    }
  }

  if (left === -1)
    return [-1, -1]

  let right = -1
  for (let i = xs.length - 1; i >= 0; --i) {
    if (xs[i] < 0) {
      right = i
      break
    }
  }

  return [left, right]
}

/**
 * @param {number[]} s
 * @returns {number}
 */
const sub_max_prod = s => {
  log(`SUB`, s)
  const prod = sub_product(s)

  if (prod > 0) {
    return prod
  }

  const [l, r] = find_negs(s)
  log(`LR`, l, r)

  if (l === r) {
    const left = sub_product(s, 0, l)
    const right = sub_product(s, l + 1)
    log(`EQ`, left, right, l, r)
    return Math.max(left, right, prod)
  }

  const left = sub_product(s, l + 1)
  const right = sub_product(s, 0, r)
  log(`NONEQ`, left, right, l, r)
  return Math.max(left, right, prod)
}

/**
 * @param {number[]} nums
 * @return {number}
 */
const maxProduct = nums => {
  const subs = split_by_0(nums)
  const max_prods = subs.map(sub_max_prod)

  return Math.max(...max_prods, nums.indexOf(0) > -1 ? 0 : -Infinity)
}

console.log(
  //maxProduct([1, -2, 2, -4, 3, 0, 0, -1, 5, 2, 0, 1, 2, 0, 0, 0, 2, -1, 3, 4, -2, 2, -5, 2]),
  maxProduct([-2, 0, -1]),
  maxProduct([-2]),
  maxProduct([0])
)

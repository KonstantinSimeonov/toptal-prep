// https://leetcode.com/problems/jump-game-ii
const jump /* dj tomekk kommt! */ = nums => {
  let xs = Array.from({ length: nums.length }, () => Number.MAX_SAFE_INTEGER)
  xs[0] = 0
  for (let i = 0; i < nums.length; ++i) {
    for (let j = 1; j <= nums[i] && i + j < nums.length; ++j) {
      xs[i + j] = Math.min(xs[i + j], xs[i] + 1)
    }
  }

  return xs[nums.length - 1]
}

const rand_int = (low, high) => Math.random() * (high - low) + low | 0

const big = Array.from(
  { length: 10000 },
  () => 20
)

console.log(
  jump([2, 3, 1, 1, 4]),
  jump([2, 3, 0, 1, 4]),
  jump([3, 1, 5, 7, 1, 1, 1, 4, 2, 2, 2, 20]),
  jump([1]),
  jump([1, 2]),
  jump([5, 1]),
  jump([5, 1, 1, 1, 1]),
  jump([5, 1, 1, 1, 1, 1]),
  jump([5, 1, 1, 1, 1, 1, 1]),
  jump(big),
)

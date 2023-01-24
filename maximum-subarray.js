// https://leetcode.com/problems/maximum-subarray/description/
const maxSubArray = (nums) => {
  let ans = nums[0]

  let i = 0;
  while (i < nums.length && nums[i] < 0) {
    ans = Math.max(nums[i++], ans)
  }

  let s = 0;
  for (; i < nums.length; ++i) {
    if (s + nums[i] > 0) {
      s += nums[i];
      ans = Math.max(ans, s);
    } else {
      ans = Math.max(ans, nums[i])
      s = 0;
    }
  }

  return ans
};

console.log(
  maxSubArray([-2,1,-3,4,-1,2,1,-5,4]),
  maxSubArray([1]),
  maxSubArray([5,4,-1,7,8]),
  maxSubArray([-2, -1]),
  maxSubArray([-1]),
  maxSubArray([1, -1, 1]),
  maxSubArray([-1,1,2,1])
)

// https://app.codility.com/programmers/lessons/4-counting_elements/missing_integer/
function solution(nums) {
  const n = nums.filter(x => x >= 0).sort((a, b) => a - b)

  if (n.length === 0 || n[0] > 1) {
    return 1
  }

  for (let i = 0; i < n.length - 1; ++i) {
    if (n[i + 1] - n[i] > 1) {
      return n[i] + 1
    }
  }

  switch (n.length) {
    case 1:
      return n[0] + 1
    default:
      return n[n.length - 1] + 1
  }
}

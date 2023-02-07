// https://leetcode.com/problems/longest-palindromic-substring

/**
 * @param {number} l
 * @param {number} r
 * @param {string} s
 * @returns {[number, number]}
 */

const look = (l, r, s) => {
  while (s[l] === s[r] && l >= 0 && r < s.length) {
    --l
    ++r
  }

  return [l, r]
}

/**
 * @param {string} s
 * @returns {number}
 */
const longestPalindrome = s => {
  let max_len = 0
  let max_p = ``

  for (let i = 0; i < s.length; ++i) {
    for (const lr of [[i - 1, i + 1], [i, i + 1]]) {
      const lr1 = look(...lr, s)
      const p_len = lr1[1] - lr1[0] - 1
      if (max_len < p_len) {
        max_len = p_len
        max_p = s.slice(l + 1, r)
      }
    }
  }

  return max_p
}

console.log(
  [
    [`babad`, `bab`],
    [`fghababa`, `ababa`],
    [`x`, `x`],
    [`cbbd`, `bb`],
    [`bbbb`, `bbbb`],
    [`aabb`, `aabb`],
    [`noon`, `noon`],
    [`oo`, `oo`],
    [`ysaippuakivikauppiasx`, `saippuakivikauppias`]
  ].map(
    x => [longestPalindrome(x[0]), x[1]]
  )
)

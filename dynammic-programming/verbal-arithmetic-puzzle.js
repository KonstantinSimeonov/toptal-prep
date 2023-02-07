// https://leetcode.com/problems/verbal-arithmetic-puzzle/
const isSolvable = (words, result) => {
  const f = {}
  const nz = new Set(words.filter(w => w.length > 1).map(w => w[0]))
  if (result.length > 1) {
    nz.add(result[0])
  }

  for (let i = 1; ;++i) {
    for (const w of words) {
      if (i <= w.length) {
        const c = w[w.length - i]
        f[c] = (f[c] | 0) + 10 ** (i - 1)
      }
    }

    if (i <= result.length) {
      const c = result[result.length - i]
      f[c] = (f[c] | 0) - 10 ** (i - 1)
    } else {
      break
    }
  }

  const ps = Object.entries(f)
  ps.sort((a, b) => nz.has(b[0]) - nz.has(a[0]))
  console.log(ps)

  return rec(nz, ps, 0, 0, 0)
}

const rec = (nz, ps, n, s, used) => {
  if (n === ps.length) {
    return s === 0
  }


  for (let i = nz.has(ps[n][0]) ? 1 : 0; i <= 9; ++i) {
    if ((used >> i) & 1) {
      continue
    }

    if (rec(nz, ps, n + 1, s + i * ps[n][1] | 0, used | (1 << i))) {
      return true
    }
  }

  return false
}

console.log(
  isSolvable([`SEND`, `MORE`], `MONEY`),
  isSolvable(["SIX","SEVEN","SEVEN"], "TWENTY"),
  isSolvable([`LEET`, `CODE`], `POINT`),
  isSolvable([`A`, `B`], `A`)
)

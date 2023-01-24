const lcs = (str1, str2) => {
  let table = Array.from({ length: str1.length + 1 }, () => Array.from({ length: str2.length + 1 }, () => 0))

  for (let i = 1; i < table.length; ++i) {
    for (let j = 1; j < table[i].length; ++j) {
      if (str1[i - 1] === str2[j - 1]) {
        table[i][j] = table[i - 1][j - 1] + 1
      } else {
        table[i][j] = Math.max(table[i - 1][j], table[i][j - 1])
      }
    }
  }

  return table
}

const backtrack = (str1, str2, table) => {
  let i = str1.length
  let j = str2.length

  let ans = []
  while (i > 0 && j > 0) {
    if (str1[i - 1] === str2[j - 1]) {
      ans.push(str1[i - 1])
      --i
      --j
      continue
    }

    if (table[i - 1][j] > table[i][j - 1]) {
      --i
    } else {
      --j
    }
  }

  return ans.reverse().join(``)
}

;[
  [`abcd`, `bbcb`, 2],
  [`ab`, `ab`, 2],
  [`ab`, `bb`, 1],
  [`a`, `a`, 1],
  [`abc`, `our`, 0],
  [``, ``, 0],
  [`famous grouse`, `micky mouse`, 6],
  [`famousgrouse`, `micky mouse`, 5],
  [`dynammic`, `programmatic`, 5],
  [`possible`, `impossible`, 8],
  [`possible`, `impossibility`, 7],
  [`rekt`, `wrecked`, 3],
].forEach(([a, b, res]) => {
  const table = lcs(a, b)
  const r = table.slice(-1)[0].slice(-1)[0]
  console.log(r, res, `"${backtrack(a, b, table)}"`, r === res ? `OK` : `KEK`)
})

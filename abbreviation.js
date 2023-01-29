// https://www.hackerrank.com/challenges/abbr/problem

/**
 * @param {string} a
 * @returns {string}
 */
const is_lower = a => a === a.toLowerCase()

/**
 * @param {string} a
 * @param {string} b
 * @returns {string}
 */
const abbreviation = (a, b) => {
  const table = Array.from({ length: a.length + 1 }, () => Array.from({ length: b.length + 1 }, () => false))
  table[0][0] = true
  for (let i = 1; i <= a.length; ++i) {
    table[i][0] = table[i - 1][0] && is_lower(a[i - 1])
  }

  for (let i = 1; i <= a.length; ++i) {
    for (let j = 1; j <= b.length; ++j) {
      if (a[i - 1].toUpperCase() === b[j - 1]) {
        table[i][j] = is_lower(a[i - 1])
          ? table[i - 1][j - 1] || table[i - 1][j]
          : table[i - 1][j - 1]
      } else {
        table[i][j] = is_lower(a[i - 1]) && table[i - 1][j]
      }
    }
  }

  return table[a.length][b.length] ? `YES` : `NO`
}

console.log(
  abbreviation(`daBcd`, `ABC`),
  abbreviation(`AbcDE`, `ABDE`),
  abbreviation(`bAb`, `A`),
  abbreviation(`bb`, `B`),
  abbreviation(`bbc`, `BCB`),
  abbreviation(`A`, `A`),
  abbreviation(`abcd`, `BCDA`),
  abbreviation(`ababbaAbAB`, `AABABB`),
  abbreviation(`AHE`, `HAE`),
  abbreviation(`ABCD`, `ABD`),
  abbreviation(`FYyxu`, `FY`)
)

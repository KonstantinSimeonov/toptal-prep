// https://leetcode.com/problems/jump-game-iii
const canReach = (xs, start) => {
  const nodes = [start]
  xs[start] *= -1

  while (nodes.length) {
    const ni = nodes.pop()

    const d = -xs[ni]

    if (d === 0) return true

    const dr = ni + d
    if (dr < xs.length && xs[dr] >= 0) {
      xs[dr] *= -1
      nodes.push(dr)
    }

    const dl = ni - d
    if (dl >= 0 && xs[dl] >= 0) {
      xs[dl] *= -1
      nodes.push(dl)
    }
  }

  return false
}

console.log(
  canReach([4, 2, 3, 0, 3, 1, 2], 5),
  canReach([4,2,3,0,3,1,2], 0),
  canReach([3,0,2,1,2], 2),
  canReach([3,0,2,2,2], 2),
  canReach([0], 0),
  canReach([1, 2, 3], 1),
  canReach([4, 4, 4, 4, 0], 0)
)

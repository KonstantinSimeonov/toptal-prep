// https://leetcode.com/problems/longest-consecutive-sequence/
//
const longestConsecutive = (nums: readonly number[]): number => {
  const hm = new Map<number, { start: number; end: number }>();
  const visited = new Set<number>();
  let max = 0;

  for (const n of nums) {
    if (visited.has(n)) continue;
    visited.add(n);

    const prev = hm.get(n - 1);
    const next = hm.get(n + 1);

    let start = prev?.start ?? n;
    let end = next?.end ?? n;

    const range = { start, end };
    hm.set(start, range);
    hm.set(end, range);

    max = Math.max(max, end - start + 1);
  }

  return max;
};

for (const t of [
  [100, 4, 200, 1, 3, 2],
  [0, 3, 7, 2, 5, 8, 4, 6, 0, 1],
  [9, 1, 4, 7, 3, -1, 0, 5, 8, -1, 6],
  [
    -6, -9, 8, -8, -1, -3, -6, 8, -9, -1, -4, -8, -5, 0, 1, 6, -8, -5, -7, 8,
    -2, -8, 4, 5, -5, -1, -5,
  ],
]) {
  console.log(
    t,
    t.slice().sort((a, b) => a - b)
  );
  console.log(longestConsecutive(t));
  console.log(`======`);
}

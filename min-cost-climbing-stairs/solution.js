// https://leetcode.com/problems/min-cost-climbing-stairs/
const minCostClimbingStairs = cost => {
  cost.push(0)
  for (let i = 2; i < cost.length; ++i) {
    cost[i] += Math.min(cost[i - 1], cost[i - 2])
  }

  return cost.pop()
}

minCostClimbingStairs([10, 15, 20])
minCostClimbingStairs([1,100,1,1,1,100,1,1,100,1])

export type CompoundData = {
  day: number;
  nodeCount: number;
  rewards: number;
}

export const createCompoundData = (tokensPerNode: number, dailyReward: number, startingNodeCount: number, tokenReward?: boolean) => {
  const totalNodes = 100
  const nodes = Array.from({length: totalNodes}, (_, i) => i + 1).splice(startingNodeCount - 1, totalNodes)
  const getDay = (prevDayCount: number, reward: number) => {
    return tokensPerNode / (tokenReward ? reward : reward / 100) + prevDayCount
  }
  const mappedNodes = nodes.reduce((acc: CompoundData[], nodeCount, index) => {
    const firstDay = {day: 0, nodes: 1, rewards: dailyReward}
    const prevDay = index > 0 ? acc[index-1] : firstDay
    return [
      ...acc,
      {
        day: index > 0 ? getDay(prevDay.day, prevDay.rewards) : firstDay.day,
        nodeCount,
        rewards: dailyReward * nodeCount
      }
    ]
  }, [])
  return mappedNodes
}

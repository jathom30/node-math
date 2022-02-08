export const hello = 'hello'

export type CompoundData = {
  day: number;
  nodeCount: number;
  rewards: number;
}

export const createCompoundData = (tokensPerNode: number, dailyReward: number, tax: number, maxNodeCount?: number) => {
  const nodes = Array.from({length: maxNodeCount || 100}, (_, i) => i + 1)
  const getDay = (prevDayCount: number, reward: number) => {
    return tokensPerNode / reward + prevDayCount
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

// claim tax
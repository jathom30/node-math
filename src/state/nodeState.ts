import { atomFamily } from "recoil"

export const nodeCount = atomFamily({
  key: 'nodeCount',
  default: 1,
})

export const nodeCost = atomFamily({
  key: 'nodeCost',
  default: 0,
})

// daily node rewards
export const nodeRewards = atomFamily({
  key: 'nodeRewards',
  default: 0,
})

export const nodeWithdrawTax = atomFamily({
  key: 'withdrawTax',
  default: 0,
})
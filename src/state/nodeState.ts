import { atom } from "recoil"

export const nodeCount = atom({
  key: 'nodeCount',
  default: 1,
})

export const nodeCost = atom({
  key: 'nodeCost',
  default: 0,
})

// daily node rewards
export const nodeRewards = atom({
  key: 'nodeRewards',
  default: 0,
})

export const nodeWithdrawTax = atom({
  key: 'withdrawTax',
  default: 0,
})
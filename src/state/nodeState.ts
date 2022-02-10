import { atomFamily, selectorFamily } from "recoil"
import { tokenPrice } from "./tokenState"

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

export const nodeCompoundTax = atomFamily({
  key: 'nodeCompoundTax',
  default: 0,
})

export const dailyNodeEarnings = selectorFamily({
  key: 'dailyNodeEarningsSelector',
  get: (config: {id: string, taxType: 'compound' | 'withdraw'}) => ({ get }) => {
    const {id, taxType} = config
    const currentPrice = get(tokenPrice(id))
    const daily = get(nodeRewards(id))
    const nodecount = get(nodeCount(id))
    const tax = taxType === 'compound' ? get(nodeCompoundTax(id)) : get(nodeWithdrawTax(id))
    const remainderAfterTaxes = (100 - (tax || 0)) / 100
    return currentPrice * daily * nodecount * remainderAfterTaxes
  }
})
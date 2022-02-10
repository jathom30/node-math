import { atomFamily, selectorFamily } from "recoil"
import { tokenPrice } from "./tokenState"
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist()

export const nodeCount = atomFamily({
  key: 'nodeCount',
  default: 1,
  effects: [persistAtom]
})

export const nodeCost = atomFamily({
  key: 'nodeCost',
  default: 0,
  effects: [persistAtom]
})

// daily node rewards
export const nodeRewards = atomFamily({
  key: 'nodeRewards',
  default: 0,
  effects: [persistAtom]
})

export const nodeWithdrawTax = atomFamily({
  key: 'withdrawTax',
  default: 0,
  effects: [persistAtom]
})

export const nodeCompoundTax = atomFamily({
  key: 'nodeCompoundTax',
  default: 0,
  effects: [persistAtom]
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
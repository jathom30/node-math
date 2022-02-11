import { atom, atomFamily, selectorFamily } from "recoil"
import { tokenAtom, userSetPrice } from "./tokenState"
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist()

export const nodeIdsAtom = atom<string[]>({
  key: 'nodeIds',
  default: ['initial'],
  effects: [persistAtom]
})

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

export const nodeFee = atomFamily<number | undefined, string>({
  key: 'nodeFee',
  default: undefined,
  effects: [persistAtom]
})

export const dailyNodeEarnings = selectorFamily({
  key: 'dailyNodeEarningsSelector',
  get: (config: {id: string, taxType: 'compound' | 'withdraw'}) => ({ get }) => {
    const {id, taxType} = config
    const marketPrice = get(tokenAtom(id))?.market_data.current_price.usd || 0
    const currentPrice = get(userSetPrice(id))
    const daily = get(nodeRewards(id))
    const nodecount = get(nodeCount(id))
    const monthlyFee = get(nodeFee(id))
    // assumes 30 day month for easier math
    const dailyFee = monthlyFee ? monthlyFee / 30 : 0
    const tax = taxType === 'compound' ? get(nodeCompoundTax(id)) : get(nodeWithdrawTax(id))
    const remainderAfterTaxes = (100 - (tax || 0)) / 100
    return (currentPrice || marketPrice) * daily * nodecount * remainderAfterTaxes - dailyFee
  }
})
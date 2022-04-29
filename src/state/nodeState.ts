import { atom, atomFamily, selectorFamily } from "recoil"
import { tokenAtom, userSetPrice } from "./tokenState"
import { recoilPersist } from "recoil-persist";
import { exchangeAtom } from "./otherState";

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

// daily node rewards type
export const tokenRewardAtom = atomFamily({
  key: 'tokenRewardAtom',
  default: 'true',
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

export const nodeSalesTax = atomFamily({
  key: 'nodeSalesTax',
  default: 0,
  effects: [persistAtom]
})

export const nodeFee = atomFamily({
  key: 'nodeFee',
  default: 0,
  effects: [persistAtom]
})

export const dailyNodeEarnings = selectorFamily({
  key: 'dailyNodeEarningsSelector',
  get: (config: {id: string, taxType: 'compound' | 'withdraw'}) => ({ get }) => {
    const {id, taxType} = config
    const marketPrice = get(tokenAtom(id))?.market_data.current_price.btc || 0
    const currentPrice = get(userSetPrice(id))
    const exchange = get(exchangeAtom)
    const tokensPerNode = get(nodeCost(id))
    // if user has set price, divide by exchange rate to make sure math is done in BTC...
    // ...else use marketPrice (which is always in BTC)
    const priceInBTC = currentPrice ? currentPrice / (exchange?.value || 1) : marketPrice
    const daily = get(nodeRewards(id))
    const tokenRewards = get(tokenRewardAtom(id))

    // reward can be a percentage or token value...
    // ... if token value, do no additional math...
    // ... if percentage, divide by 100 (to get percent)...
    // ...and multiple by the number of tokens per node because...
    // ...percent based rewards are based on node and not token price
    const dailyReward = tokenRewards ? daily : (daily / 100 * tokensPerNode)

    const nodecount = get(nodeCount(id))
    const monthlyFee = get(nodeFee(id))
    // assumes 30 day month for easier math...
    // ...divide by exchange rate to ensure math is done on BTC
    const dailyFee = monthlyFee ? monthlyFee / (exchange?.value || 1) / 30 : 0
    const tax = taxType === 'compound' ? get(nodeCompoundTax(id)) : get(nodeWithdrawTax(id))
    const salesTax = get(nodeSalesTax(id)) || 0
    const remainderAfterTaxes = (100 - (tax + salesTax || 0)) / 100
    return priceInBTC * dailyReward * nodecount * remainderAfterTaxes - dailyFee
  }
})

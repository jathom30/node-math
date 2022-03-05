import { SingleValue } from "react-select";
import { atom, atomFamily, selector } from "recoil";
import { recoilPersist } from "recoil-persist";
import { dailyNodeEarnings, nodeCount, nodeIdsAtom } from "./nodeState";

const { persistAtom } = recoilPersist()

export const stepAtom = atomFamily({
  key: 'stepAtom',
  default: 0,
  effects: [persistAtom],
})

export const collapsedAtom = atomFamily({
  key: 'collapsedAtom',
  default: false,
  effects: [persistAtom],
})

export const widthAtom = atom({
  key: 'widthAtom',
  default: 0,
})

export const exchangeAtom = atom<SingleValue<{name: string, unit: string, value: number, type: string}> | undefined>({
  key: 'exchangeAtom',
  default: undefined,
  effects: [persistAtom],
})

export const includeInTotalAtom = atomFamily({
  key: 'includeInTotalAtom',
  default: false,
  effects: [persistAtom],
})

export const includedIdsSelector = selector({
  key: 'includedIdsSelector',
  get: ({ get }) => {
    const ids = get(nodeIdsAtom)
    return ids.reduce((includedIds: string[], id) => {
      const included = get(includeInTotalAtom(id))
      if (included) {
        return [...includedIds, id]
      }
      return includedIds
    }, [])
  }
})

export const totalsSelector = selector({
  key: 'totalsSelector',
  get: ({ get }) => {
    const ids = get(includedIdsSelector)
    const total = ids.reduce((total, id) => {
      const dailyEarning = get(dailyNodeEarnings({id, taxType: 'withdraw'}))
      return total += dailyEarning 
    }, 0)
    return total
  }
})

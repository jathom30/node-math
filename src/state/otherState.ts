import { SingleValue } from "react-select";
import { atom, atomFamily, selector } from "recoil";
import { recoilPersist } from "recoil-persist";
import { dailyNodeEarnings, nodeIdsAtom } from "./nodeState";

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

export const totalsSelector = selector({
  key: 'totalsSelector',
  get: ({ get }) => {
    const ids = get(nodeIdsAtom)
    const total = ids.reduce((total, id) => {
      const include = get(includeInTotalAtom(id))
      if (!include) return total
      const dailyEarning = get(dailyNodeEarnings({id, taxType: 'withdraw'}))
      return total += dailyEarning
    }, 0)
    return total
  }
})
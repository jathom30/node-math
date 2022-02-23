import { SingleValue } from "react-select";
import { atom, atomFamily } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist()

export const stepAtom = atomFamily({
  key: 'stepAtom',
  default: 0,
  effects: [persistAtom]
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

export const currencyAtom = atom({
  key: 'currencyAtom',
  default: 'USD',
})

export const exchangeAtom = atom<SingleValue<{name: string, unit: string, value: number, type: string}>>({
  key: 'exchangeAtom',
  default: {
    name: "US Dollar",
    unit: "$",
    value: 37586.84,
    type: "fiat"
  },
})
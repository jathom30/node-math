import { atomFamily } from "recoil";
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
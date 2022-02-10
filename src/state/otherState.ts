import { atom, atomFamily } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist()

export const nodeIdsAtom = atom<string[]>({
  key: 'nodeIds',
  default: ['initial'],
  effects: [persistAtom]
})

export const stepAtom = atomFamily({
  key: 'stepAtom',
  default: 0,
  effects: [persistAtom]
})
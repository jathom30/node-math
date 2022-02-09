import { atomFamily } from "recoil";

export const stepAtom = atomFamily({
  key: 'stepAtom',
  default: 0,
})
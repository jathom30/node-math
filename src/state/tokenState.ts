import { atomFamily } from "recoil";
import { Token } from "types";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist()


export const tokenAtom = atomFamily<Token | undefined, string>({
  key: 'token', // unique ID (with respect to other atoms/selectors)
  default: undefined, // default value (aka initial value)
  effects:[persistAtom]
});

export const userSetPrice = atomFamily<number | undefined, string>({
  key: 'userSetPrice',
  default: undefined,
  effects: [persistAtom]
})

export const tokenIdAtom = atomFamily<string | undefined, string>({
  key: 'tokenId',
  default: undefined,
  effects: [persistAtom]
})
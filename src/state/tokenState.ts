import { atom } from "recoil";
import { Token } from "types";

export const tokenAtom = atom<Token | undefined>({
  key: 'token', // unique ID (with respect to other atoms/selectors)
  default: undefined, // default value (aka initial value)
});

export const tokenId = atom<string | undefined>({
  key: 'tokenId',
  default: undefined,
})
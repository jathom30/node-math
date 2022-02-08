import { atomFamily } from "recoil";
import { Token } from "types";

export const tokenAtom = atomFamily<Token | undefined, string>({
  key: 'token', // unique ID (with respect to other atoms/selectors)
  default: undefined, // default value (aka initial value)
});

export const tokenPrice = atomFamily<number, string>({
  key: 'tokenPrice',
  default: 0,
})

export const tokenIdAtom = atomFamily<string | undefined, string>({
  key: 'tokenId',
  default: undefined,
})
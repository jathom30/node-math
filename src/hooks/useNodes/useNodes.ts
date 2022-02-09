import { useRecoilValue, useSetRecoilState } from 'recoil';
import { nodeCost, nodeCount, nodeRewards, nodeWithdrawTax, stepAtom, tokenIdAtom } from 'state';
import {v4 as uuid }from 'uuid'

export const useNodes = (id: string) => {
  const tokenId = useRecoilValue(tokenIdAtom(id))
  const count = useRecoilValue(nodeCount(id))
  const cost = useRecoilValue(nodeCost(id))
  const rewards = useRecoilValue(nodeRewards(id))
  const tax = useRecoilValue(nodeWithdrawTax(id))
  const step = useRecoilValue(stepAtom(id))

  const cloneId = uuid()

  const setClonedTokenId = useSetRecoilState(tokenIdAtom(cloneId))
  const setClonedCount = useSetRecoilState(nodeCount(cloneId))
  const setClonedCost = useSetRecoilState(nodeCost(cloneId))
  const setClonedRewards = useSetRecoilState(nodeRewards(cloneId))
  const setClonedTax = useSetRecoilState(nodeWithdrawTax(cloneId))
  const setStep = useSetRecoilState(stepAtom(cloneId))

  const onCopyNode = () => {
    setClonedTokenId(tokenId)
    setClonedCount(count)
    setClonedCost(cost)
    setClonedRewards(rewards)
    setClonedTax(tax)
    setStep(step)
  }

  return {onCopyNode, cloneId}
}
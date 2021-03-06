import { useRecoilValue, useSetRecoilState } from 'recoil';
import { collapsedAtom, nodeCompoundTax, nodeCost, nodeCount, nodeFee, nodeRewards, nodeSalesTax, nodeWithdrawTax, stepAtom, tokenIdAtom, tokenRewardAtom, userSetPrice } from 'state';
import {v4 as uuid }from 'uuid'

export const useNodes = (id: string) => {
  const tokenId = useRecoilValue(tokenIdAtom(id))
  const count = useRecoilValue(nodeCount(id))
  const cost = useRecoilValue(nodeCost(id))
  const rewards = useRecoilValue(nodeRewards(id))
  const tax = useRecoilValue(nodeWithdrawTax(id))
  const compoundTax = useRecoilValue(nodeCompoundTax(id))
  const salesTax = useRecoilValue(nodeSalesTax(id))
  const step = useRecoilValue(stepAtom(id))
  const userPrice = useRecoilValue(userSetPrice(id))
  const isCollapsed = useRecoilValue(collapsedAtom(id))
  const fee = useRecoilValue(nodeFee(id))
  const tokenReward = useRecoilValue(tokenRewardAtom(id))

  const cloneId = uuid()

  const setClonedTokenId = useSetRecoilState(tokenIdAtom(cloneId))
  const setClonedCount = useSetRecoilState(nodeCount(cloneId))
  const setClonedCost = useSetRecoilState(nodeCost(cloneId))
  const setClonedRewards = useSetRecoilState(nodeRewards(cloneId))
  const setClonedTax = useSetRecoilState(nodeWithdrawTax(cloneId))
  const setStep = useSetRecoilState(stepAtom(cloneId))
  const setUserPrice = useSetRecoilState(userSetPrice(cloneId))
  const setIsCollapsed = useSetRecoilState(collapsedAtom(cloneId))
  const setCompoundTax = useSetRecoilState(nodeCompoundTax(cloneId))
  const setSalesTax = useSetRecoilState(nodeSalesTax(cloneId))
  const setNodeFee = useSetRecoilState(nodeFee(cloneId))
  const setTokenReward = useSetRecoilState(tokenRewardAtom(cloneId))

  const onCopyNode = () => {
    setClonedTokenId(tokenId)
    setClonedCount(count)
    setClonedCost(cost)
    setClonedRewards(rewards)
    setClonedTax(tax)
    setCompoundTax(compoundTax)
    setSalesTax(salesTax)
    setStep(step)
    setUserPrice(userPrice)
    setIsCollapsed(isCollapsed)
    setNodeFee(fee)
    setTokenReward(tokenReward)
  }

  return {onCopyNode, cloneId}
}
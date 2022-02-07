import { useRecoilState, useSetRecoilState } from 'recoil';
import { nodeCost, nodeCount, nodeRewards, nodeWithdrawTax, tokenIdAtom } from 'state';
import {v4 as uuid }from 'uuid'

export const useNodes = (id: string) => {
  const [tokenId, setTokenId] = useRecoilState(tokenIdAtom(id))
  const [count, setCount] = useRecoilState(nodeCount(id))
  const [cost, setCost] = useRecoilState(nodeCost(id))
  const [rewards, setRewards] = useRecoilState(nodeRewards(id))
  const [tax, setTax] = useRecoilState(nodeWithdrawTax(id))

  const cloneId = uuid()

  const setClonedTokenId = useSetRecoilState(tokenIdAtom(cloneId))
  const setClonedCount = useSetRecoilState(nodeCount(cloneId))
  const setClonedCost = useSetRecoilState(nodeCost(cloneId))
  const setClonedRewards = useSetRecoilState(nodeRewards(cloneId))
  const setClonedTax = useSetRecoilState(nodeWithdrawTax(cloneId))

  const onClearNode = () => {
    setTokenId(undefined)
    setCount(1)
    setCost(0)
    setRewards(0)
    setTax(0)
  }

  const onCopyNode = () => {
    setClonedTokenId(tokenId)
    setClonedCount(count)
    setClonedCost(cost)
    setClonedRewards(rewards)
    setClonedTax(tax)
  }

  return {onCopyNode, onClearNode, cloneId}
}
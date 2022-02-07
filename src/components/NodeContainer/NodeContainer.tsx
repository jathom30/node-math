import React from 'react';
import { FlexBox, NodeInputs, TokenDisplay, TokenSearch } from 'components';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { nodeCost, nodeCount, nodeRewards, nodeWithdrawTax, tokenIdAtom } from 'state';
import './NodeContainer.scss'
import { SingleValue } from 'react-select';
import { TokenSearchResult } from 'types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export const NodeContainer: React.FC<{
  id: string
  onRemoveContainer: (id: string) => void
  canRemove: boolean
}> = ({id, onRemoveContainer, canRemove}) => {
  const [tokenId, setTokenId] = useRecoilState(tokenIdAtom(id))
  const setNodeCount = useSetRecoilState(nodeCount(id))
  const setNodeCost = useSetRecoilState(nodeCost(id))
  const setNodeRewards = useSetRecoilState(nodeRewards(id))
  const setNodeTax = useSetRecoilState(nodeWithdrawTax(id))

  const handleSelectToken = (token: SingleValue<TokenSearchResult>) => {
    setTokenId(token?.id)
  }

  const handleClearToken = () => {
    setTokenId(undefined)
    setNodeCount(1)
    setNodeCost(0)
    setNodeRewards(0)
    setNodeTax(0)
  }

  return (
    <div className="NodeContainer">
      {canRemove && <FlexBox justifyContent="flex-end">
        <button className='NodeContainer__delete-btn' onClick={() => onRemoveContainer(id)}><FontAwesomeIcon icon={faTrash} /></button>
      </FlexBox>}
      <div className="NodeContainer__wrapper">
        <FlexBox gap="1rem" flexDirection='column'>
          {!tokenId ? (
            <TokenSearch onChange={handleSelectToken} />
          ) : (
            <>
              <TokenDisplay onClearTokenId={handleClearToken} id={id} />
              <NodeInputs id={id} />
            </>
          )}
        </FlexBox>
      </div>
    </div>
  )
}
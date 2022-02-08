import React from 'react';
import { FlexBox, NodeInputs, TokenDisplay, TokenSearch } from 'components';
import { useRecoilState } from 'recoil';
import { tokenIdAtom } from 'state';
import './NodeContainer.scss'
import { SingleValue } from 'react-select';
import { TokenSearchResult } from 'types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faGripHorizontal, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNodes } from 'hooks/useNodes';
import { Button } from 'components/Button';

export const NodeContainer: React.FC<{
  id: string
  onRemove: (id: string) => void
  onCopy: (newId: string, referenceId: string) => void
  canRemove: boolean
}> = ({id, onRemove, onCopy, canRemove}) => {
  const [tokenId, setTokenId] = useRecoilState(tokenIdAtom(id))
  const {onCopyNode, onClearNode, cloneId} = useNodes(id)

  const handleSelectToken = (token: SingleValue<TokenSearchResult>) => {
    setTokenId(token?.id)
  }

  const handleCopyNode = () => {
    onCopy(cloneId, id)
    onCopyNode()
  }

  return (
    <div className="NodeContainer">
      <div className="NodeContainer__header">
        <FlexBox justifyContent="space-between">
          <div className='NodeContainer__btn NodeContainer__btn--handle' onClick={handleCopyNode}><FontAwesomeIcon icon={faGripHorizontal} /></div>
          <FlexBox justifyContent="flex-end" gap="1rem">
            <Button isRounded kind='copy' onClick={handleCopyNode}><FontAwesomeIcon icon={faCopy} /></Button>
            <Button isRounded kind="danger" onClick={() => onRemove(id)}><FontAwesomeIcon icon={faTrash} /></Button>
          </FlexBox>
        </FlexBox>
      </div>
      <div className="NodeContainer__wrapper">
        <FlexBox gap="1rem" flexDirection='column'>
          {!tokenId ? (
            <TokenSearch onChange={handleSelectToken} />
          ) : (
            <>
              <TokenDisplay onClearTokenId={onClearNode} id={id} />
              <NodeInputs id={id} />
            </>
          )}
        </FlexBox>
      </div>
    </div>
  )
}
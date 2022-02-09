import React from 'react';
import { Box, CollapsibleCard, FlexBox, NodeInputs, TokenDisplay, TokenSearch } from 'components';
import { useRecoilState } from 'recoil';
import { tokenIdAtom } from 'state';
import './NodeContainer.scss'
import { SingleValue } from 'react-select';
import { TokenSearchResult } from 'types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClone, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNodes } from 'hooks/useNodes';
import { Button } from 'components/Button';

export const NodeContainer: React.FC<{
  id: string
  onRemove: (id: string) => void
  onCopy: (newId: string, referenceId: string) => void
  canRemove: boolean
}> = ({id, onRemove, onCopy, canRemove, children}) => {
  const [tokenId, setTokenId] = useRecoilState(tokenIdAtom(id))
  const {onCopyNode, cloneId} = useNodes(id)

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
          {children}
          <FlexBox justifyContent="flex-end" gap="1rem">
            <Button isRounded kind='copy' onClick={handleCopyNode}><FontAwesomeIcon icon={faClone} /></Button>
            <Button isRounded kind="danger" onClick={() => onRemove(id)}><FontAwesomeIcon icon={faTrash} /></Button>
          </FlexBox>
        </FlexBox>
      </div>
      {!tokenId ? (
        <Box paddingTop="1rem">
          <TokenSearch onChange={handleSelectToken} />
        </Box>
      ) : (
        <CollapsibleCard
          header={
            <Box paddingTop="1rem">
              <TokenDisplay id={id} />
            </Box>
          }
        >
          <Box padding='1rem'>
            <NodeInputs id={id} />
          </Box>
        </CollapsibleCard>
      )}
    </div>
  )
}
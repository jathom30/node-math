import React from 'react';
import { Box, CollapsibleCard, FlexBox, NodeInputs, TokenDisplay, TokenSearch, Button } from 'components';
import { useRecoilState } from 'recoil';
import { collapsedAtom, includeInTotalAtom, tokenIdAtom } from 'state';
import { SingleValue } from 'react-select';
import { TokenSearchResult } from 'types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClone, faSquareCheck, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faSquare} from '@fortawesome/free-regular-svg-icons'
import { useNodes } from 'hooks/useNodes';
import './NodeContainer.scss'

export const NodeContainer: React.FC<{
  id: string
  onRemove: (id: string) => void
  onCopy: (newId: string, referenceId: string) => void
  isMobile: boolean
}> = ({id, onRemove, onCopy, isMobile, children}) => {
  const [isCollapsed, setIsCollapsed] = useRecoilState(collapsedAtom(id))
  const [tokenId, setTokenId] = useRecoilState(tokenIdAtom(id))
  const [inTotal, setInTotal] = useRecoilState(includeInTotalAtom(id))
  const {onCopyNode, cloneId} = useNodes(id)
  
  const handleSelectToken = (token: SingleValue<TokenSearchResult>) => {
    setTokenId(token?.id)
  }

  const handleCopyNode = () => {
    onCopy(cloneId, id)
    onCopyNode()
  }

  return (
    <div className={`NodeContainer ${!isMobile ? 'NodeContainer--is-desktop' : ''}`}>
      <div className="NodeContainer__header">
        <FlexBox justifyContent="space-between">
          {children}
          <FlexBox justifyContent="flex-end" gap="1rem">
            <Button
              isRounded
              kind='text'
              onClick={() => setInTotal(!inTotal)}
            >
              <FlexBox gap="0.25rem" alignItems="center">
                Include in total
                <FontAwesomeIcon icon={inTotal ? faSquareCheck : faSquare} />
              </FlexBox>
            </Button>
            <Button isRounded kind='secondary' onClick={handleCopyNode}><FontAwesomeIcon icon={faClone} /></Button>
            <Button isRounded kind="danger" onClick={() => onRemove(id)}><FontAwesomeIcon icon={faTrash} /></Button>
          </FlexBox>
        </FlexBox>
      </div>
      {!tokenId ? (
        <Box paddingTop="1rem">
          <TokenSearch onChange={handleSelectToken} />
        </Box>
      ) : (
        <FlexBox padding='1rem' gap="2rem" flexDirection={isMobile ? 'column' : 'row'}>
          <TokenDisplay id={id} isCollapsed={isCollapsed} />
          <NodeInputs id={id} />
        </FlexBox>
      )}
    </div>
  )
}
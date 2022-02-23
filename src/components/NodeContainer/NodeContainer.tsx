import React, { useState } from 'react';
import { Box, CollapsibleCard, FlexBox, NodeInputs, TokenDisplay, TokenSearch, Button, Modal } from 'components';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { collapsedAtom, exchangeAtom, tokenIdAtom } from 'state';
import { SingleValue } from 'react-select';
import { TokenSearchResult } from 'types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClone, faCog, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNodes } from 'hooks/useNodes';
import './NodeContainer.scss'
import Select from 'react-select';
import { useQuery } from 'react-query';
import { getExchangeRates } from 'api';

export const NodeContainer: React.FC<{
  id: string
  onRemove: (id: string) => void
  onCopy: (newId: string, referenceId: string) => void
  canRemove: boolean
}> = ({id, onRemove, onCopy, canRemove, children}) => {
  const [isCollapsed, setIsCollapsed] = useRecoilState(collapsedAtom(id))
  const [tokenId, setTokenId] = useRecoilState(tokenIdAtom(id))
  const {onCopyNode, cloneId} = useNodes(id)
  const [showSettings, setShowSettings] = useState(false)
  const setExchange = useSetRecoilState(exchangeAtom)

  const handleSelectToken = (token: SingleValue<TokenSearchResult>) => {
    setTokenId(token?.id)
  }

  const handleCopyNode = () => {
    onCopy(cloneId, id)
    onCopyNode()
  }

  const exchangeRatesQuery = useQuery('exchange-rates', getExchangeRates)
  const options = exchangeRatesQuery.data?.data.rates ? Object.values(exchangeRatesQuery.data?.data.rates) : []

  return (
    <div className="NodeContainer">
      <div className="NodeContainer__header">
        <FlexBox justifyContent="space-between">
          {children}
          <FlexBox justifyContent="flex-end" gap="1rem">
            <Button isRounded kind='text' onClick={() => setShowSettings(true)}><FontAwesomeIcon icon={faCog} /></Button>
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
        <CollapsibleCard
          isCollapsed={isCollapsed}
          onChange={setIsCollapsed}
          header={
            <Box paddingTop="1rem">
              <TokenDisplay id={id} isCollapsed={isCollapsed} />
            </Box>
          }
        >
          <Box padding='1rem'>
            <NodeInputs id={id} />
          </Box>
        </CollapsibleCard>
      )}
      {showSettings && (
        <Modal offClick={() => setShowSettings(false)}>
          <div className="NodeContainer__settings-modal">
            <span>Select Currency</span>
            <Select
              name="exchange-rate"
              options={options}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.name}
              onChange={(newExchange) => setExchange(newExchange)}
            />
          </div>
        </Modal>
      )}
    </div>
  )
}
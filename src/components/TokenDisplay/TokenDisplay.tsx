import { faSearch, faSpinner, faSync, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getToken } from 'api';
import { Modal, TokenSearch } from 'components';
import { toCurrency } from 'helpers';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { SingleValue } from 'react-select';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { tokenAtom, tokenId } from 'state/tokenState';
import { TokenSearchResult } from 'types';
import { FlexBox } from '../Box';
import './TokenDisplay.scss'

export const TokenDisplay: React.FC<{onClearTokenId: () => void}> = ({onClearTokenId}) => {
  const [showSearch, setShowSearch] = useState(false)
  const setToken = useSetRecoilState(tokenAtom)
  const [id, setId] = useRecoilState(tokenId)
  const tokenQuery = useQuery(
    ['token', id],
    () => id ? getToken(id) : undefined,
    {
      enabled: !!id,
      onSuccess: (data) => setToken(data?.data)
    },
  )

  const token = tokenQuery.data?.data

  const currentPrice = token?.market_data.current_price.usd ?? 0
  const low24 = token?.market_data.low_24h.usd ?? 0
  const high24 = token?.market_data.high_24h.usd ?? 0

  const dayDiff = high24 - low24
  const currentDiff = currentPrice - low24
  const percDiff = 100 - currentDiff / dayDiff * 100

  const handleSelectToken = (token: SingleValue<TokenSearchResult>) => {
    setId(token?.id)
    setShowSearch(false)
  }

  if (tokenQuery.isLoading) return <span>...loading...</span>
  return (
    <div className="TokenDisplay">
      <FlexBox alignItems="center" gap="1rem" justifyContent="space-between">
        <FlexBox alignItems="center" gap="0.5rem">
          <img className="TokenDisplay__img" src={token?.image.small} alt={token?.name} />
          <button className='TokenDisplay__refresh-btn' onClick={() => tokenQuery.refetch()}>
            <FlexBox gap="0.5rem" alignItems="center">
              <h2>{token?.name} ({token?.symbol.toUpperCase()})</h2>
              <span><FontAwesomeIcon icon={faSync} /></span>
            </FlexBox>
          </button>
        </FlexBox>
        <FlexBox gap="1rem">
          <button className='TokenDisplay__clear-btn' onClick={() => setShowSearch(true)}><FontAwesomeIcon icon={faSearch} /></button>
          <button className='TokenDisplay__clear-btn' onClick={onClearTokenId}><FontAwesomeIcon icon={faTimes} /></button>
        </FlexBox>
      </FlexBox>
      <FlexBox justifyContent="flex-end" gap="0.5rem">
      </FlexBox>
      <FlexBox flexDirection='column' gap="0.25rem">
        {tokenQuery.isFetching ? (
          <h1><FontAwesomeIcon icon={faSpinner} /></h1>
        ) : (
          <h1>{toCurrency(currentPrice)} <span>USD</span></h1>
        )}
        <div className="TokenDisplay__money-bar">
          <div className="TokenDisplay__filled-bar" style={{width: `${percDiff}%`}} />
        </div>
        <FlexBox justifyContent="space-between">
          <span className='TokenDisplay__minmax-price'>{toCurrency(token?.market_data.low_24h.usd || 0)}</span>
          <span className='TokenDisplay__minmax-price'>{toCurrency(token?.market_data.high_24h.usd || 0)}</span>
        </FlexBox>
      </FlexBox>
      <FlexBox justifyContent="flex-end">
        <a href={`https://coingecko.com/en/coins/${token?.id}`} target="_blank" rel="noopener noreferrer">More coin info here</a>
      </FlexBox>
      {showSearch && (
        <Modal offClick={() => setShowSearch(false)}>
          <div className="TokenDisplay__modal">
            <TokenSearch onChange={handleSelectToken} />
          </div>
        </Modal>
      )}
    </div>
  )
}
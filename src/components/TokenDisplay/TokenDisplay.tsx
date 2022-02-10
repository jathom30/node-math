import { faEdit, faSearch, faSpinner, faSync } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getToken } from 'api';
import { LabelInput, Modal, TokenSearch } from 'components';
import { Button } from 'components/Button';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { SingleValue } from 'react-select';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { tokenAtom, tokenIdAtom, userSetPrice } from 'state/tokenState';
import { TokenSearchResult } from 'types';
import { FlexBox } from '../Box';
import './TokenDisplay.scss'

export const TokenDisplay: React.FC<{id: string, isCollapsed?: boolean}> = ({id, isCollapsed = false}) => {
  const [showSearch, setShowSearch] = useState(false)
  const setToken = useSetRecoilState(tokenAtom(id))
  const [price, setPrice] = useRecoilState(userSetPrice(id))
  const [tokenId, setTokenId] = useRecoilState(tokenIdAtom(id))
  const tokenQuery = useQuery(
    ['token', tokenId, id],
    () => tokenId ? getToken(tokenId) : undefined,
    {
      enabled: !!tokenId,
      staleTime: Infinity,
      onSuccess: (data) => {
        setToken(data?.data)
      }
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
    setTokenId(token?.id)
    setShowSearch(false)
  }

  const handleSetPrice = (newPrice: number | string) => {
    if (typeof newPrice === 'string') {
      setPrice(parseFloat(newPrice))
    } else {
      setPrice(newPrice)
    }
  }

  const notCurrentPrice = price && price !== currentPrice

  const handleResetPrice = () => {
    tokenQuery.refetch()
    setPrice(undefined)
  }

  if (tokenQuery.isLoading) return <span>loading...</span>
  if (isCollapsed) {
    return (
      <div className="TokenDisplay TokenDisplay--collapsed">
        <FlexBox flexDirection='column' gap=".5rem">
          <FlexBox justifyContent="space-between" alignItems="center">
            <FlexBox gap="0.5rem" alignItems="center">
              <img className="TokenDisplay__img" src={token?.image.small} alt={token?.name} />
              <h3>{token?.name} ({token?.symbol.toUpperCase()})</h3>
            </FlexBox>
            <FlexBox gap="0.5rem" alignItems="center">
              <h2>${price || currentPrice} <span>USD</span></h2>
              <Button kind="copy" isRounded onClick={handleResetPrice}><FontAwesomeIcon icon={faSync} /></Button>
            </FlexBox>
          </FlexBox>
          <div className="TokenDisplay__money-bar">
            <div className="TokenDisplay__filled-bar" style={{width: `${percDiff}%`}} />
          </div>
          <FlexBox justifyContent="space-between">
            <span className='TokenDisplay__minmax-price'>${token?.market_data.low_24h.usd || 0}</span>
            <span className='TokenDisplay__minmax-price'>${token?.market_data.high_24h.usd || 0}</span>
          </FlexBox>
        </FlexBox>
      </div>
    )
  }
  return (
    <div className="TokenDisplay">
      <FlexBox alignItems="center" gap="1rem" justifyContent="space-between">
        <FlexBox alignItems="center" gap="0.5rem">
          <img className="TokenDisplay__img" src={token?.image.small} alt={token?.name} />
          <button className='TokenDisplay__search-btn' onClick={() => setShowSearch(true)}>
            <FlexBox gap="0.5rem" alignItems="center">
              <h2>{token?.name} ({token?.symbol.toUpperCase()})</h2>
              <span><FontAwesomeIcon icon={faSearch} /></span>
            </FlexBox>
          </button>
        </FlexBox>
        <FlexBox gap="1rem">
          <Button isRounded kind="copy" onClick={() => tokenQuery.refetch()}><FontAwesomeIcon icon={faSync} /></Button>
        </FlexBox>
      </FlexBox>
      
      <FlexBox flexDirection='column' gap="0.25rem">
        {tokenQuery.isFetching ? (
          <h1><FontAwesomeIcon icon={faSpinner} /></h1>
        ) : (
          <FlexBox gap="1rem" alignItems="center" padding='.25rem 0'>
            <LabelInput value={price || currentPrice} onSubmit={handleSetPrice}>
              <FlexBox padding='.125rem' alignItems="center" gap="1rem">
                  <h1>${price || currentPrice} <span>USD</span></h1>
                  <FontAwesomeIcon icon={faEdit} />
              </FlexBox>
            </LabelInput>
          </FlexBox>
        )}
        {notCurrentPrice ? (
          <>
            <Button kind="danger" onClick={handleResetPrice}>Reset to current market price</Button>
          </>
        ) : (
          <>
            <div className="TokenDisplay__money-bar">
              <div className="TokenDisplay__filled-bar" style={{width: `${percDiff}%`}} />
            </div>
            <FlexBox justifyContent="space-between">
              <span className='TokenDisplay__minmax-price'>${token?.market_data.low_24h.usd || 0}</span>
              <span className='TokenDisplay__minmax-price'>${token?.market_data.high_24h.usd || 0}</span>
            </FlexBox>
          </>
        )}
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
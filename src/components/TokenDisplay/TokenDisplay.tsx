import { faEdit, faSearch, faSpinner, faSync } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getToken } from 'api';
import { LabelInput, Modal, TokenSearch, FlexBox, Button } from 'components';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { SingleValue } from 'react-select';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { TOKEN_QUERY, tokenAtom, tokenIdAtom, userSetPrice, exchangeAtom } from 'state';
import { TokenSearchResult } from 'types';
import ReactGA from 'react-ga'
import './TokenDisplay.scss'
import { getExchangedAmount, toCurrency } from 'helpers';

export const TokenDisplay: React.FC<{id: string, isCollapsed?: boolean}> = ({id, isCollapsed = false}) => {
  const [showSearch, setShowSearch] = useState(false)
  const setToken = useSetRecoilState(tokenAtom(id))
  const [price, setPrice] = useRecoilState(userSetPrice(id))
  const [tokenId, setTokenId] = useRecoilState(tokenIdAtom(id))
  const exchange = useRecoilValue(exchangeAtom)
  // const currency = useRecoilValue(currencyAtom)
  const tokenQuery = useQuery(
    [TOKEN_QUERY, tokenId, id],
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

  const currentPrice = getExchangedAmount(token?.market_data.current_price.btc || 0, exchange?.value || 0)

  const low24 = getExchangedAmount(token?.market_data.low_24h.btc || 0, exchange?.value || 0)
  const high24 = getExchangedAmount(token?.market_data.high_24h.btc || 0, exchange?.value || 0)

  const dayDiff = high24 - low24
  const currentDiff = currentPrice - low24
  const percDiff = 100 - currentDiff / dayDiff * 100

  const handleSelectToken = (token: SingleValue<TokenSearchResult>) => {
    ReactGA.event({
      category: 'Token',
      action: 'Select',
      label: token?.id,
    })
    setTokenId(token?.id)
    setShowSearch(false)
  }

  const handleSetPrice = (newPrice: number | string) => {
    const isString = typeof newPrice === 'string'
    ReactGA.event({
      category: 'Token',
      action: 'Custom price',
      ...(isString ? {label: newPrice} : {value: newPrice})
    })
    if (typeof newPrice === 'string') {
      setPrice(parseFloat(newPrice))
    } else {
      setPrice(newPrice)
    }
  }

  const notCurrentPrice = price && price !== currentPrice

  const handleResetPrice = () => {
    ReactGA.event({
      category: 'Token',
      action: 'Refetch',
      label: tokenId,
    })
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
              <button className='TokenDisplay__search-btn' onClick={() => setShowSearch(true)}>
                <FlexBox gap="0.5rem" alignItems="center">
                  <h2>{token?.name} ({token?.symbol.toUpperCase()})</h2>
                  <span><FontAwesomeIcon icon={faSearch} /></span>
                </FlexBox>
              </button>
            </FlexBox>
            <FlexBox gap="0.5rem" alignItems="center">
              {tokenQuery.isFetching ? (
                <h2 className="TokenDisplay__loading"><FontAwesomeIcon icon={faSpinner} /></h2>
              ) : (
                <h2>{exchange?.unit} {toCurrency(price || currentPrice)} <span>{exchange?.name}</span></h2>
              )}
              <Button kind="secondary" isRounded onClick={handleResetPrice}><FontAwesomeIcon icon={faSync} /></Button>
            </FlexBox>
          </FlexBox>
          <div className="TokenDisplay__money-bar">
            <div className="TokenDisplay__filled-bar" style={{width: `${percDiff}%`}} />
          </div>
          <FlexBox justifyContent="space-between">
            <span className='TokenDisplay__minmax-price'>{exchange?.unit}{toCurrency(low24)}</span>
            <span className='TokenDisplay__minmax-price'>{exchange?.unit}{toCurrency(high24)}</span>
          </FlexBox>
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
          <Button isRounded kind="secondary" onClick={() => tokenQuery.refetch()}><FontAwesomeIcon icon={faSync} /></Button>
        </FlexBox>
      </FlexBox>
      
      <FlexBox flexDirection='column' gap="0.25rem">
        {tokenQuery.isFetching ? (
          <h1 className='TokenDisplay__loading'><FontAwesomeIcon icon={faSpinner} /></h1>
        ) : (
          <FlexBox gap="1rem" alignItems="center" padding='.25rem 0'>
            <LabelInput value={toCurrency(price || currentPrice)} onSubmit={handleSetPrice}>
              <FlexBox padding='.125rem' alignItems="center" gap="1rem">
                  <h1>{exchange?.unit} {toCurrency(price || currentPrice)} <span>{exchange?.name}</span></h1>
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
              <span className='TokenDisplay__minmax-price'>{exchange?.unit} {toCurrency(low24)}</span>
              <span className='TokenDisplay__minmax-price'>{exchange?.unit} {toCurrency(high24)}</span>
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
import { getToken } from 'api';
import { toCurrency } from 'helpers';
import React from 'react';
import { useQuery } from 'react-query';
import { useSetRecoilState } from 'recoil';
import { tokenAtom } from 'state/tokenState';
import { FlexBox } from '../Box';
import './TokenDisplay.scss'

export const TokenDisplay: React.FC<{tokenId?: string, onClearTokenId: () => void}> = ({tokenId, onClearTokenId}) => {
  const setToken = useSetRecoilState(tokenAtom)
  const tokenQuery = useQuery(
    ['token', tokenId],
    () => tokenId ? getToken(tokenId) : undefined,
    {
      enabled: !!tokenId,
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

  if (tokenQuery.isLoading) return <span>...loading...</span>
  return (
    <div className="TokenDisplay">
      <FlexBox alignItems="center" gap="1rem" justifyContent="space-between">
        <FlexBox alignItems="center" gap="1rem">
          <img className="TokenDisplay__img" src={token?.image.small} alt={token?.name} />
          <h2>{token?.name} ({token?.symbol.toUpperCase()})</h2>
        </FlexBox>
        <button className='TokenDisplay__clear-btn' onClick={onClearTokenId}>X</button>
      </FlexBox>
      <FlexBox flexDirection='column' gap="0.25rem">
        <h1>{toCurrency(currentPrice)}</h1>
        <div className="TokenDisplay__money-bar">
          <div className="TokenDisplay__filled-bar" style={{width: `${percDiff}%`}} />
        </div>
        <FlexBox justifyContent="space-between">
          <span className='TokenDisplay__minmax-price'>{toCurrency(token?.market_data.low_24h.usd || 0)}</span>
          <span className='TokenDisplay__minmax-price'>{toCurrency(token?.market_data.high_24h.usd || 0)}</span>
        </FlexBox>
      </FlexBox>
    </div>
  )
}
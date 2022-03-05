import { FlexBox, GridBox } from 'components';
import { toCurrency } from 'helpers';
import React, { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { dailyNodeEarnings, exchangeAtom, includeInTotalAtom, nodeCount, nodeIdsAtom, tokenAtom, totalsSelector } from 'state';
import './NodeTotals.scss'

const earningsPeriods = [
  {
    label: 'D',
    value: 1,
  },
  {
    label: 'W',
    value: 7,
  },
  {
    label: 'M',
    value: 30,
  },
  {
    label: 'Y',
    value: 365,
  },
]

export const NodeTotals = () => {
  const [activeEarningsPeriod, setActiveEarningsPeriod] = useState(1)
  const ids = useRecoilValue(nodeIdsAtom)
  const dailyTotal = useRecoilValue(totalsSelector)
  const exchange = useRecoilValue(exchangeAtom)

  const earningsLabel = () => {
    switch (activeEarningsPeriod) {
      case 1:
        return 'Daily Total'
      case 7:
        return 'Weekly Total'
      case 30:
        return 'Monthly Total'
      case 365:
        return 'Yearly Total'
      default:
        return 'Total'
    }
  }
  return (
    <div className="NodeTotals">
      <FlexBox flexDirection='column' gap="1rem">
        <FlexBox justifyContent="space-between">
          <h5>Node Totals</h5>
          <FlexBox>
            {earningsPeriods.map((period) => (
              <button
                key={period.value}
                onClick={() => setActiveEarningsPeriod(period.value)}
                className={`NodeTable__earnings-btn ${activeEarningsPeriod === period.value ? 'NodeTable__earnings-btn--active' : ''}`}
              >
                {period.label}
              </button>
            ))}
          </FlexBox>
        </FlexBox>
        <FlexBox gap="0.5rem" flexDirection='column'>
          <GridBox gridTemplateColumns="1fr 1fr 1fr">
            <span className='NodeTotals__label NodeTotals__label--header'>Node</span>
            <span className='NodeTotals__label NodeTotals__label--header'>Count</span>
            <span className='NodeTotals__label NodeTotals__label--header'>Total</span>
          </GridBox>
          {ids.map((id) => <NodeItem id={id} period={activeEarningsPeriod} key={id} />)}
        </FlexBox>
        <div className="NodeTotals__hr" />
        <FlexBox alignSelf="flex-end" alignItems="flex-end" gap="0.5rem">
          <span className="NodeTotals__label">{earningsLabel()}</span>
          <span className="NodeTotals__total">{`${exchange?.unit}${toCurrency(dailyTotal * (exchange?.value || 1) * activeEarningsPeriod)}`}</span>
        </FlexBox>
      </FlexBox>
    </div>
  )
}

const NodeItem = ({id, period} : {id: string; period: number}) => {
  const [include, setInclude] = useRecoilState(includeInTotalAtom(id))
  const token = useRecoilValue(tokenAtom(id))
  const dailyEarnings = useRecoilValue(dailyNodeEarnings({id, taxType: 'withdraw'}))
  const exchange = useRecoilValue(exchangeAtom)
  const [count, setCount] = useRecoilState(nodeCount(id))

  if (!include) return null

  const displayEarnings = toCurrency(dailyEarnings * (exchange?.value || 1) * period)
  return (
    <div className="NodeItem">
      <GridBox gridTemplateColumns="1fr 1fr 1fr" gap="0.5rem" alignItems="center" justifyContent="space-between">
        <FlexBox gap="0.5rem" alignItems="center">
          <img className='NodeItem__img' src={token?.image.thumb} alt={`${token?.name} icon`} />
          <FlexBox flexDirection='column'>
            <span className="NodeItem__name">{token?.name}</span>
            <span className="NodeItem__symbol">{token?.symbol}</span>
          </FlexBox>
        </FlexBox>
        <input type="number" className="NodeItem__input" value={count} onChange={e => setCount(parseFloat(e.target.value))} />
        <FlexBox flexDirection='column'>
          <span className="NodeItem__earnings">{exchange?.unit} {displayEarnings}</span>
          <button
            className="NodeItem__btn NodeItem__btn--remove"
            onClick={() => setInclude(false)}
          >
            Remove
          </button>
        </FlexBox>
      </GridBox>
    </div>
  )
}
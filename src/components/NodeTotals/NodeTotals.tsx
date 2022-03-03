import { FlexBox } from 'components';
import { toCurrency } from 'helpers';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { exchangeAtom, totalsSelector } from 'state';
import './NodeTotals.scss'

export const NodeTotals = () => {
  const dailyTotal = useRecoilValue(totalsSelector)
  const exchange = useRecoilValue(exchangeAtom)
  return (
    <div className="NodeTotals">
      <FlexBox flexDirection='column' gap="0.5rem">
        <h4>Totals</h4>
        <span>Node count</span>
        <span>Daily/weekly/monthly/yearly selection</span>
        <span>Nodes in total</span>
        <span>{toCurrency(dailyTotal * (exchange?.value || 1))}</span>
      </FlexBox>
    </div>
  )
}
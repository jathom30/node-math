import React, { useState } from 'react';
import { FlexBox, GridBox } from 'components';
import { CompoundData, createCompoundData, toCurrency } from 'helpers';
import { useRecoilValue } from 'recoil';
import { nodeCost, nodeRewards, dailyNodeEarnings, nodeCount, tokenAtom, exchangeAtom, tokenRewardAtom } from 'state';
import './NodeTable.scss'

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

export const NodeTable: React.FC<{id: string}> = ({id}) => {
  const [activeEarningsPeriod, setActiveEarningsPeriod] = useState(1)
  const [compoundDisplay, setCompoundDisplay] = useState<'Days' | 'Date'>('Days')
  const nodecount = useRecoilValue(nodeCount(id))
  const nodecost = useRecoilValue(nodeCost(id))
  const dailyReward = useRecoilValue(nodeRewards(id))
  const tokenReward = useRecoilValue(tokenRewardAtom(id))
  const token = useRecoilValue(tokenAtom(id))
  const exchange = useRecoilValue(exchangeAtom)

  const data = createCompoundData(nodecost, dailyReward, nodecount, tokenReward)

  return (
    <div className="NodeTable">
      <FlexBox flexDirection='column'>
        <div className="NodeTable__headers">
          <FlexBox flexDirection='column'>
            <h3>Node Compound Table (after node compound tax, sales tax, and monthly fee)</h3>
            <GridBox gridTemplateColumns={`repeat(4, 1fr)`} gap="0.5rem" alignItems="flex-end" paddingTop="0.25rem">
              <span>Nodes</span>
              <div>
                <FlexBox>
                  <button
                    className={`NodeTable__earnings-btn ${compoundDisplay === 'Days' ? 'NodeTable__earnings-btn--active' : ''}`}
                    onClick={() => setCompoundDisplay('Days')}
                  >
                    Days
                  </button>
                  <button
                    className={`NodeTable__earnings-btn ${compoundDisplay === 'Date' ? 'NodeTable__earnings-btn--active' : ''}`}
                    onClick={() => setCompoundDisplay('Date')}
                  >
                    Date
                  </button>
                </FlexBox>
                <span>to compound</span>
              </div>
              <span>{tokenReward ? token?.symbol.toUpperCase() : '%'}/day</span>
              <div>
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
                <span>Earnings ({exchange?.name})</span>
              </div>
            </GridBox>
          </FlexBox>
        </div>
        {data?.map((row) => (
          <TableRow key={row.nodeCount} row={row} id={id} earningsPeriod={activeEarningsPeriod} compoundDisplay={compoundDisplay} />
        ))}
      </FlexBox>
    </div>
  )
}

function addDays(date: Date, days: number) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

const TableRow: React.FC<{row: CompoundData, id: string, earningsPeriod: number; compoundDisplay: 'Date' | 'Days'}> = ({row, id, earningsPeriod, compoundDisplay}) => {
  const nodecount = useRecoilValue(nodeCount(id))
  const dailyEarnings = useRecoilValue(dailyNodeEarnings({id, taxType: 'compound'}))
  const tokenReward = useRecoilValue(tokenRewardAtom(id))
  const exchange = useRecoilValue(exchangeAtom)


  const getDailyEarnings = (numberOfNodes: number) => {
    const daily = dailyEarnings * numberOfNodes / nodecount
    return toCurrency(daily * earningsPeriod * (exchange?.value || 1))
  }
  const today = new Date()
  const date = addDays(today, row.day).toLocaleDateString()
  const dayRow = compoundDisplay === 'Days' ? Math.round(row.day).toLocaleString() : date
  return (
    <div className="NodeTable__row">
      <GridBox gridTemplateColumns={`repeat(4, 1fr)`} gap="0.5rem">
        <span>{row.nodeCount}</span>
        <span>{dayRow}</span>
        <span>{Math.round((row.rewards + Number.EPSILON) * 1000) / 1000}{!tokenReward && '%'}</span>
        <span style={{whiteSpace: 'nowrap'}}>{exchange?.unit} {getDailyEarnings(row.nodeCount)}</span>
      </GridBox>
    </div>
  )
}
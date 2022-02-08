import React from 'react';
import { FlexBox, GridBox } from 'components';
import { createCompoundData, toCurrency } from 'helpers';
import { useRecoilValue } from 'recoil';
import { nodeCost, nodeRewards, nodeWithdrawTax, dailyNodeEarnings, nodeCount } from 'state';
import './NodeTable.scss'

export const NodeTable: React.FC<{id: string}> = ({id}) => {
  const nodecount = useRecoilValue(nodeCount(id))
  const nodecost = useRecoilValue(nodeCost(id))
  const dailyReward = useRecoilValue(nodeRewards(id))
  const tax = useRecoilValue(nodeWithdrawTax(id))
  const dailyEarnings = useRecoilValue(dailyNodeEarnings(id))

  const data = createCompoundData(nodecost, dailyReward, tax)

  const getDailyEarnings = (numberOfNodes: number) => {
    return toCurrency(dailyEarnings * numberOfNodes / nodecount)
  }

  return (
    <div className="NodeTable">
      <FlexBox flexDirection='column'>
        <div className="NodeTable__headers">
          <FlexBox flexDirection='column' gap="0.5rem">
            <h3>Node Compound Table</h3>
            <GridBox gridTemplateColumns={`repeat(4, 1fr)`} gap="0.5rem">
              <span>Nodes</span>
              <span>Days</span>
              <span>Rewards/day</span>
              <span>USD earnings/day</span>
            </GridBox>
          </FlexBox>
        </div>
        {data?.map((row) => (
          <div key={row.nodeCount} className="NodeTable__row">
            <GridBox gridTemplateColumns={`repeat(4, 1fr)`} gap="0.5rem">
              <span>{row.nodeCount}</span>
              <span>{Math.round(row.day).toLocaleString()}</span>
              <span>{Math.round((row.rewards + Number.EPSILON) * 1000) / 1000}</span>
              <span>{getDailyEarnings(row.nodeCount)}</span>
            </GridBox>
          </div>
        ))}
      </FlexBox>
    </div>
  )
}
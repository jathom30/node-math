import React from 'react';
import { FlexBox, GridBox } from 'components';
import { createCompoundData } from 'helpers';
import { useRecoilValue } from 'recoil';
import { nodeCost, nodeRewards, nodeWithdrawTax } from 'state';
import './NodeTable.scss'

export const NodeTable = () => {
  const nodecost = useRecoilValue(nodeCost)
  const dailyReward = useRecoilValue(nodeRewards)
  const tax = useRecoilValue(nodeWithdrawTax)

  const data = createCompoundData(nodecost, dailyReward, tax)

  return (
    <div className="NodeTable">
      <FlexBox flexDirection='column'>
        <div className="NodeTable__headers">
          <FlexBox flexDirection='column' gap="0.5rem">
            <h3>Node Compound Table</h3>
            <GridBox gridTemplateColumns={`repeat(3, 1fr)`} gap="0.5rem">
              <span>Nodes</span>
              <span>Days</span>
              <span>Rewards/day</span>
            </GridBox>
          </FlexBox>
        </div>
        {data?.map((row) => (
          <div key={row.nodeCount} className="NodeTable__row">
            <GridBox gridTemplateColumns={`repeat(3, 1fr)`} gap="0.5rem">
              <span>{row.nodeCount}</span>
              <span>{Math.round(row.day)}</span>
              <span>{Math.round((row.rewards + Number.EPSILON) * 1000) / 1000}</span>
            </GridBox>
          </div>
        ))}
      </FlexBox>
    </div>
  )
}
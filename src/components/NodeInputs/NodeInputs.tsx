import React, { useState } from 'react';
import { FlexBox, Input, NodeTable } from 'components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { nodeCost, nodeCount, nodeRewards, nodeWithdrawTax, tokenAtom } from 'state';
import { toCurrency } from 'helpers';
import './NodeInputs.scss'

export const NodeInputs = () => {
  const [step, setStep] = useState(0)
  const [nodecount, setNodecount] = useRecoilState(nodeCount)
  const [nodecost, setNodecost] = useRecoilState(nodeCost)
  const [daily, setDaily] = useRecoilState(nodeRewards)
  const [tax, setTax] = useRecoilState(nodeWithdrawTax)

  const token = useRecoilValue(tokenAtom)
  const currentPrice = token?.market_data.current_price.usd ?? 0
  const nodeBuyInPrice = nodecost * currentPrice

  const isEnabled = () => {
    switch (step) {
      case 0:
        return true
      case 1:
        return nodecost > 0
      case 2:
        return daily > 0
      default:
        return true
    }
  }

  const getEarnings = (days: number) => {
    const remainderAfterTaxes = (100 - (tax || 0)) / 100
    return currentPrice * daily * nodecount * days * remainderAfterTaxes
  }

  return (
    <div className="NodeInputs">
      <FlexBox flexDirection='column' gap="1rem">
        <Input
          label='Node count'
          name="nodecount"
          value={nodecount}
          onChange={(val) => setNodecount(parseFloat(val))}
        />
        {step > 0 && <Input
          label={`Node cost (in ${token?.symbol.toUpperCase()} tokens)`}
          name="nodecost"
          value={nodecost}
          onChange={(val) => setNodecost(parseFloat(val))}
        />}
        {step > 1 && (
          <FlexBox flexDirection='column' gap="0.25rem">
            <h3>Current node(s) purchase price (USD)</h3>
            <div className="NodeInputs__box">
              <p><span>({nodecost} tokens per node)</span> {toCurrency(nodeBuyInPrice)}</p>
              <p><span>(Number of nodes)</span> x {nodecount}</p>
              <div className='NodeInputs__seperator' />
              <p>{toCurrency(nodeBuyInPrice * nodecount)}</p>
            </div>
          </FlexBox>
        )}
        {step > 1 && (
          <>
            <Input
              label={`Daily node rewards (${token?.symbol.toUpperCase()})`}
              name="daily"
              value={daily}
              onChange={(val) => setDaily(parseFloat(val))}
              step={0.001}
            />
            <Input
              label={`Withdraw tax (%)`}
              name="tax"
              value={tax}
              onChange={(val) => setTax(parseFloat(val))}
              step={0.1}
            />
          </>
        )}
        {step > 2 &&
        <>
        <FlexBox flexDirection='column' gap="0.25rem">
          <h3>Earnings at current price after tax (USD)</h3>
          <div className="NodeInputs__box">
            <p><span>(Daily)</span> {toCurrency(getEarnings(1))}</p>
            <p><span>(Weekly)</span> {toCurrency(getEarnings(7))}</p>
            <p><span>(30 day month)</span> {toCurrency(getEarnings(30))}</p>
            <p><span>(Yearly)</span> {toCurrency(getEarnings(365))}</p>
          </div>
        </FlexBox>
          <FlexBox flexDirection='column' gap="0.25rem">
          <h3>Number of days to ROI/compound (rounded up)</h3>
          <p className='NodeInputs__box'>{Math.ceil(nodecost / daily).toLocaleString()}</p>
        </FlexBox>
        <NodeTable />
        </>
        }
        {step < 3 && <button
          className={`NodeInputs__btn`}
          onClick={() => setStep(step + 1)} disabled={!isEnabled()}
        >
          Continue
        </button>}
      </FlexBox>
    </div>
  )
}
import React, { useState } from 'react';
import { FlexBox, Input } from 'components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { nodeCost, nodeCount, nodeRewards, tokenAtom } from 'state';
import './NodeInputs.scss'
import { toCurrency } from 'helpers';

export const NodeInputs = () => {
  const [step, setStep] = useState(0)
  const [nodecount, setNodecount] = useRecoilState(nodeCount)
  const [nodecost, setNodecost] = useRecoilState(nodeCost)
  const [daily, setDaily] = useRecoilState(nodeRewards)

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

  const handleNext = () => {
    if (step === 3) {
      handleClear()
    } else {
      setStep(step + 1)
    }
    
  }

  const handleClear = () => {
    setStep(0)
    setNodecount(1)
    setNodecost(0)
    setDaily(0)
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
        {step > 1 && <Input
          label={`Daily node rewards (${token?.symbol.toUpperCase()})`}
          name="daily"
          value={daily}
          onChange={(val) => setDaily(parseFloat(val))}
          step={0.001}
        />}
        {step > 2 &&
        <>
        <FlexBox flexDirection='column' gap="0.25rem">
          <h3>Earnings at current price (USD)</h3>
          <div className="NodeInputs__box">
            <p><span>(Daily)</span> {toCurrency(currentPrice * daily * nodecount)}</p>
            <p><span>(Weekly)</span> {toCurrency(currentPrice * daily * nodecount * 7)}</p>
            <p><span>(30 day month)</span> {toCurrency(currentPrice * daily * nodecount * 30)}</p>
            <p><span>(Yearly)</span> {toCurrency(currentPrice * daily * nodecount * 365)}</p>
          </div>
        </FlexBox>
          <FlexBox flexDirection='column' gap="0.25rem">
          <h3>Number of days to ROI/compound (rounded up)</h3>
          <p className='NodeInputs__box'>{Math.ceil(nodecost / daily).toLocaleString()}</p>
        </FlexBox>
        </>
        }
        <button
          className={`NodeInputs__btn ${step===3 ? 'NodeInputs__btn--clear' : ''}`}
          onClick={handleNext} disabled={!isEnabled()}
        >
          {step === 3 ? 'Clear' : 'Next'}
        </button>
      </FlexBox>
    </div>
  )
}
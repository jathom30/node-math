import React from 'react';
import { FlexBox, Input, NodeTable, Button } from 'components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { dailyNodeEarnings, exchangeAtom, nodeCompoundTax, nodeCost, nodeCount, nodeFee, nodeRewards, nodeSalesTax, nodeWithdrawTax, stepAtom, tokenAtom, tokenRewardAtom, userSetPrice } from 'state';
import { toCurrency } from 'helpers';
import './NodeInputs.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins, faPercent } from '@fortawesome/free-solid-svg-icons';

export const NodeInputs: React.FC<{id: string}> = ({id}) => {
  const [step, setStep] = useRecoilState(stepAtom(id))
  const [tokenReward, setTokenReward] = useRecoilState(tokenRewardAtom(id))
  const [nodecount, setNodecount] = useRecoilState(nodeCount(id))
  const [nodecost, setNodecost] = useRecoilState(nodeCost(id))
  const [daily, setDaily] = useRecoilState(nodeRewards(id))
  const [tax, setTax] = useRecoilState(nodeWithdrawTax(id))
  const [compountTax, setCompoundTax] = useRecoilState(nodeCompoundTax(id))
  const [salesTax, setSalesTax] = useRecoilState(nodeSalesTax(id))
  const [fee, setFee] = useRecoilState(nodeFee(id))
  const exchange = useRecoilValue(exchangeAtom)
  const dailyEarnings = useRecoilValue(dailyNodeEarnings({id, taxType: 'withdraw'}))

  const token = useRecoilValue(tokenAtom(id))
  const currentPrice = token?.market_data.current_price.btc
  const customPrice = useRecoilValue(userSetPrice(id))
  const customPriceInBTC = (customPrice || 1) / (exchange?.value || 1)
  // buy in price should first check if a custom price is used, then the current token market price
  const visiblePrice = customPrice ? customPriceInBTC : currentPrice ? currentPrice : 0
  const nodeBuyInPrice = nodecost * visiblePrice

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
    return dailyEarnings * days
  }

  // const priceData = [
  //   {
  //     title: 'compound tax',
  //     value: compountTax, 
  //   },
  //   {
  //     title: 'claim tax',
  //     value: tax, 
  //   },
  //   {
  //     title: 'sales tax',
  //     value: salesTax, 
  //   },
  //   {
  //     title: 'node fee',
  //     value: fee, 
  //   },
  // ]

  const handleRewardTypeChange = () => {
    // if switching to percent based reward
    if (tokenReward) {
      setDaily(daily * 100)
    } else {
      setDaily(daily / 100)
    }
    setTokenReward(!tokenReward)
  }

  const daysToROI = Math.ceil(nodecost / (tokenReward ? daily : (daily / 100)))

  return (
    <div className="NodeInputs">
      <FlexBox flexDirection='column' gap="1rem">
        <FlexBox flexDirection='column' gap="1rem">
          <Input
            label='[Required] Node count'
            name="nodecount"
            value={nodecount}
            onChange={(val) => setNodecount(parseFloat(val))}
            required
          />
          {step > 0 && <Input
            label={`[Required] Node cost (in ${token?.symbol.toUpperCase()} tokens)`}
            name="nodecost"
            value={nodecost}
            onChange={(val) => setNodecost(parseFloat(val))}
            required
          />}
          {step > 1 && (
            <FlexBox flexDirection='column' gap="0.25rem">
              <h3>Current node(s) purchase price</h3>
              <div className="NodeInputs__box">
                <p><span>({nodecost} tokens per node)</span> {exchange?.unit} {toCurrency(nodeBuyInPrice * (exchange?.value || 1))}</p>
                <p><span>(Number of nodes)</span> x {nodecount}</p>
                <div className='NodeInputs__seperator' />
                <p>{exchange?.unit} {toCurrency(nodeBuyInPrice * nodecount * (exchange?.value || 0))}</p>
              </div>
            </FlexBox>
          )}
        </FlexBox>
        <FlexBox flexDirection='column' gap="1rem">
          {step > 1 && (
            <>
              <Input
                label={
                  <FlexBox alignItems='flex-end' justifyContent='space-between'>
                    <span>[Required] Daily node rewards ({tokenReward ? token?.symbol.toUpperCase() : '%'})</span>
                    <Button kind="secondary" isRounded onClick={handleRewardTypeChange}>
                      <FlexBox gap="0.25rem" alignItems='center'>
                        <span>Switch to</span>
                        <FontAwesomeIcon icon={tokenReward ? faPercent : faCoins} />
                      </FlexBox>
                    </Button>
                  </FlexBox>
                }
                name="daily"
                value={daily}
                onChange={(val) => setDaily(parseFloat(val))}
                step={0.001}
                required
              />
              <Input
                label={`Claim tax (%)`}
                name="tax"
                value={tax}
                onChange={(val) => setTax(parseFloat(val))}
                step={0.1}
              />
              <Input
                label={`Sales tax (%)`}
                name="sales-tax"
                value={salesTax}
                onChange={(val) => setSalesTax(parseFloat(val))}
                step={0.1}
              />
              <Input
                label={`Compound tax (%)`}
                name="compound-tax"
                value={compountTax}
                onChange={(val) => setCompoundTax(parseFloat(val))}
                step={0.1}
              />
              <Input
                label={`Node fee per month (${exchange?.name})`}
                name="node-fee"
                value={fee || 0}
                onChange={(val) => setFee(parseFloat(val))}
                step={0.1}
              />
            </>
          )}
          {step > 2 &&
          <>
          <FlexBox flexDirection='column' gap="0.25rem">
            <h3>Earnings at current price after claim tax, sales tax, and node fee</h3>
            <div className="NodeInputs__box">
              <p><span>(Daily)</span> {exchange?.unit} {toCurrency(getEarnings(1) * (exchange?.value || 1))}</p>
              <p><span>(Weekly)</span> {exchange?.unit} {toCurrency(getEarnings(7) * (exchange?.value || 1))}</p>
              <p><span>(30 day month)</span> {exchange?.unit} {toCurrency(getEarnings(30) * (exchange?.value || 1))}</p>
              <p><span>(Yearly)</span> {exchange?.unit} {toCurrency(getEarnings(365) * (exchange?.value || 1))}</p>
            </div>
            {/* <EarningsPieChart data={priceData} /> */}
          </FlexBox>
          <FlexBox flexDirection='column' gap="0.25rem">
            <h3>Number of days to ROI/compound (rounded up)</h3>
            <p className='NodeInputs__box'>{daysToROI.toLocaleString()}</p>
          </FlexBox>
          </>
          }
        </FlexBox>
        {step > 2 && <NodeTable id={id} />}
        {step < 3 && <Button
          kind='primary'
          onClick={() => setStep(step + 1)} isDisabled={!isEnabled()}
        >
          Continue
        </Button>}
      </FlexBox>
    </div>
  )
}
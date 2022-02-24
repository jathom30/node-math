import React, { useEffect, useState } from 'react';
import { faCopy, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, FlexBox } from 'components';
import { copyFallback } from 'helpers';
import ReactGA from 'react-ga4'
import './DonateInfo.scss'

const btcWallet = '32fm2iAivoqLrMLPdjpy1z1XYKpZHq2y5D'
const ethWallet = '0x5E2c1fDB8871c1442aBd0dd829F87b42D3DBB2b7'

export const DonateInfo = ({onClose}: {onClose: () => void}) => {
  return (
    <div className="DonateInfo">
      <FlexBox flexDirection='column' gap="1rem">
        <FlexBox justifyContent="flex-end">
          <Button isRounded onClick={onClose}><FontAwesomeIcon icon={faTimes} /></Button>
        </FlexBox>
        <h2>Thank you for using the <span>Crypto Node Calculator</span></h2>
        <p>We want the calculator to remain a free resource for everyone, but if you want to help us improve the calculator faster, consider donating today.</p>
        <div className='DonateInfo__hr' aria-hidden />
        <div className='DonateInfo__wallets'>
          <p><strong>We are accepting donations to the following wallets</strong></p>
          <WalletDisplay label="BTC" address={btcWallet} />
          <WalletDisplay label="ETH • FTM • AVAX • BNB" address={ethWallet} />
        </div>
      </FlexBox>
    </div>
  )
}

const WalletDisplay = ({label, address}: {label: string; address: string}) => {
  const [showSuccess, setShowSuccess] = useState(false)
  const handleCopy = () => {
    ReactGA.event({
      category: 'Donate',
      action: 'Copy',
      label,
    })
    if (!navigator.clipboard) {
      copyFallback(address, () => setShowSuccess(true));
      return;
    }
    navigator.clipboard.writeText(address).then(() => setShowSuccess(true))
  }

  useEffect(() => {
    if (showSuccess) {
      setTimeout(() => setShowSuccess(false), 900)
    }
  }, [showSuccess, setShowSuccess])

  return (
    <div className="WalletDisplay">
      <div className="WalletDisplay__group">
        <span className='WalletDisplay__label'>Coin</span>
        <span>{label}</span>
      </div>
      <div className="WalletDisplay__group">
        <span className='WalletDisplay__label'>Wallet</span>
        <span className='WalletDisplay__address'>{address}</span>
        <div className='WalletDisplay__copy-btn'>
        {showSuccess && <span className='WalletDisplay__copy-success'>Copied!</span>}
          <Button isRounded kind="secondary" onClick={handleCopy}>
            <FontAwesomeIcon icon={faCopy} />
          </Button>
        </div>
      </div>
    </div>
  )
}
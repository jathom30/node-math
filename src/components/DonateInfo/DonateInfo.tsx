import React from 'react';
import { faCopy, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, FlexBox } from 'components';
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
          <WalletDisplay label="ETH • FTM • AVAX • BMB" address={ethWallet} />
        </div>
      </FlexBox>
    </div>
  )
}

const fallback = (text: string) => {
  const isIos = navigator.userAgent.match(/ipad|iphone/i);
  const textarea = document.createElement('textarea');

  // create textarea
  textarea.value = text;

  // ios will zoom in on the input if the font-size is < 16px
  textarea.style.fontSize = '20px';
  document.body.appendChild(textarea);

  // select text
  if (isIos) {
    const range = document.createRange();
    range.selectNodeContents(textarea);

    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
    textarea.setSelectionRange(0, 999999);
  } else {
    textarea.select();
  }

  // copy selection
  document.execCommand('copy');

  // cleanup
  document.body.removeChild(textarea);
};

const WalletDisplay = ({label, address}: {label: string; address: string}) => {
  const handleCopy = () => {
    if (!navigator.clipboard) {
      fallback(address);
      return;
    }
    navigator.clipboard.writeText(address)
  }

  return (
    <div className="WalletDisplay">
      <div className="WalletDisplay__group">
        <span className='WalletDisplay__label'>Coin</span>
        <span>{label}</span>
      </div>
      <div className="WalletDisplay__group">
        <span className='WalletDisplay__label'>Wallet</span>
        <span className='WalletDisplay__address'>{address}</span>
        <Button isRounded kind="copy" onClick={handleCopy}>
          <FontAwesomeIcon icon={faCopy} />
        </Button>
      </div>
    </div>
  )
}
import React, { useState } from 'react';
import { faDonate, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, FlexBox, Modal, DonateInfo } from 'components';
import { useRecoilValue } from 'recoil';
import { widthAtom } from 'state';
import './Header.scss'

export const Header = ({onClick}: {onClick: () => void}) => {
  const width = useRecoilValue(widthAtom)
  const [showDonate, setShowDonate] = useState(false)

  const mobileView = width < 600
  return (
    <div className="Header">
      <FlexBox justifyContent="space-between" alignItems="center">
        <span>Crypto Node Calculator</span>
        <FlexBox gap="1rem">
          <Button isRounded kind="copy" onClick={() => setShowDonate(true)}>
            <FlexBox gap=".5rem" alignItems="center" padding='0 .5rem'>
              {!mobileView && <span>Donate</span>}
              <FontAwesomeIcon icon={faDonate} />
            </FlexBox>
          </Button>
          <Button isRounded kind="primary" onClick={onClick}>
            <FlexBox gap=".5rem" alignItems="center" padding='0 .5rem'>
              {!mobileView && <span>New card</span>}
              <FontAwesomeIcon icon={faPlusCircle} />
            </FlexBox>
          </Button>
        </FlexBox>
      </FlexBox>
      {showDonate && (
        <Modal offClick={() => setShowDonate(false)}>
          <DonateInfo onClose={() => setShowDonate(false)} />
        </Modal>
      )}
    </div>
  )
}
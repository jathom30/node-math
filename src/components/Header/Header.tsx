import React, { useState } from 'react';
import { faDonate, faEnvelope, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, FlexBox, Modal, DonateInfo, Settings } from 'components';
import { useRecoilValue } from 'recoil';
import { widthAtom } from 'state';
import ReactGA from 'react-ga4'
import './Header.scss'

export const Header = ({onClick}: {onClick: () => void}) => {
  const width = useRecoilValue(widthAtom)
  const [showDonate, setShowDonate] = useState(false)

  const handleShowDonateModal = () => {
    ReactGA.event({
      category: 'Donate',
      action: 'Show'
    })
    setShowDonate(true)
  }

  const handleContact = () => {
    window.location.href='mailto:ajthms@yahoo.com?subject=Crypto node calculator support'
  }

  const mobileView = width < 600
  return (
    <div className="Header">
      <FlexBox justifyContent="space-between" alignItems="center">
        <FlexBox alignItems="center" gap="0.5rem">
          <Settings />
          <span>Crypto Node Calculator</span>
        </FlexBox>
        <FlexBox gap=".5rem">
          <Button isRounded kind="secondary" onClick={handleShowDonateModal}>
            <FlexBox gap=".5rem" alignItems="center" padding='0 .5rem'>
              {!mobileView && <span>Donate</span>}
              <FontAwesomeIcon icon={faDonate} />
            </FlexBox>
          </Button>
          <Button isRounded kind="secondary" onClick={handleContact}>
            <FlexBox gap=".5rem" alignItems="center" padding='0 .5rem'>
              {!mobileView && <span>Contact</span>}
              <FontAwesomeIcon icon={faEnvelope} />
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
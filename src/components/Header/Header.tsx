import React, { useState } from 'react';
import { faDonate, faEnvelope, faLayerGroup, faPlusCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, FlexBox, Modal, DonateInfo, Settings } from 'components';
import { useRecoilValue } from 'recoil';
import { totalNodeCount, widthAtom } from 'state';
import ReactGA from 'react-ga4'
import './Header.scss'
import { NodeTotals } from 'components/NodeTotals';

export const Header = ({onClick}: {onClick: () => void}) => {
  const width = useRecoilValue(widthAtom)
  const [showDonate, setShowDonate] = useState(false)
  const [showTotals, setShowTotals] = useState(false)
  const nodeCountTotal = useRecoilValue(totalNodeCount)

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
        <FlexBox alignItems="center" gap="0.25rem">
          <Settings />
          <span className={mobileView ? 'mobile-text' : ''}>Crypto Node Calculator</span>
        </FlexBox>
        <FlexBox gap=".25rem">
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
          <Button isRounded kind="text" onClick={() => setShowTotals(true)}>
            <FlexBox gap=".5rem" alignItems="center" padding='0 .5rem'>
              <span>{!mobileView && 'Node totals '}({nodeCountTotal})</span>
              <FontAwesomeIcon icon={faLayerGroup} />
            </FlexBox>
          </Button>
        </FlexBox>
      </FlexBox>
      {showDonate && (
        <Modal offClick={() => setShowDonate(false)}>
          <DonateInfo onClose={() => setShowDonate(false)} />
        </Modal>
      )}
      {showTotals && (
        <Modal offClick={() => setShowTotals(false)}>
          <div className="Header__totals-modal">
            <FlexBox justifyContent="flex-end" paddingBottom="1rem">
              <Button isRounded onClick={() => setShowTotals(false)}><FontAwesomeIcon icon={faTimes} /></Button>
            </FlexBox>
            <NodeTotals />
          </div>
        </Modal>
      )}
    </div>
  )
}
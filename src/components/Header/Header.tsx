import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, FlexBox } from 'components';
import React from 'react';
import './Header.scss'

export const Header = ({onClick}: {onClick: () => void}) => {
  return (
    <div className="Header">
      <FlexBox justifyContent="space-between" alignItems="center">
        <span>Crypto Node Calculator</span>
        <Button isRounded kind="primary" onClick={onClick}>
          <FlexBox gap="1rem" alignItems="center" padding='0 1rem'>
            <span>New card</span>
          <FontAwesomeIcon icon={faPlusCircle} />
          </FlexBox>
        </Button>
      </FlexBox>
    </div>
  )
}
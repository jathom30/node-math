import React, { useState } from 'react';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getExchangeRates } from 'api';
import { Button, FlexBox, Modal } from 'components';
import { useQuery } from 'react-query';
import Select from 'react-select';
import { useRecoilState } from 'recoil';
import { exchangeAtom } from 'state';
import './Settings.scss'

export const Settings = () => {
  const [showSettings, setShowSettings] = useState(false)
  const [exchange, setExchange] = useRecoilState(exchangeAtom)

  const exchangeRatesQuery = useQuery('exchange-rates', getExchangeRates)
  const options = exchangeRatesQuery.data?.data.rates ? Object.values(exchangeRatesQuery.data?.data.rates) : []
  return (
    <div className="Settings">
      <Button isRounded kind='text' onClick={() => setShowSettings(true)}><FontAwesomeIcon icon={faCog} /></Button>
      {showSettings && (
        <Modal offClick={() => setShowSettings(false)}>
          <div className="Settings__modal">
            <FlexBox gap="0.25rem" flexDirection='column'>
              <span className='Settings__label'>Select Currency</span>
              <Select
                name="exchange-rate"
                defaultValue={exchange}
                options={options}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.name}
                onChange={(newExchange) => setExchange(newExchange)}
              />
            </FlexBox>
          </div>
        </Modal>
      )}
    </div>
  )
}
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FlexBox } from 'components';
import React, { useState } from 'react';
import './HideAway.scss'

export const HideAway: React.FC<{label: string}> = ({ children, label }) => {
  const [showChildren, setShowChildren] = useState(false)

  return (
    <>
      {showChildren && <div className="HideAway__backdrop" role="presentation" onClick={() => setShowChildren(false)} />}
      <div className="HideAway">
        <FlexBox flexDirection='column'>
          <button
            onClick={() => setShowChildren(!showChildren)}
            className="HideAway__show-btn"
          >
            <FlexBox alignItems="center" gap="0.5rem">
              <span>{showChildren ? 'Hide' : 'Show'} {label}</span>
              <FontAwesomeIcon icon={showChildren ? faChevronDown : faChevronUp} />
            </FlexBox>
          </button>
          {showChildren && (
            <div
              className="HideAway__content"
            >
              {children}
            </div>
          )}
        </FlexBox>
      </div>
    </>
  )
}
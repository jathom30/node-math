import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, FlexBox } from 'components';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import './CollapsibleCard.scss'

export const CollapsibleCard: React.FC<{
  header: ReactNode
  defaultCollapsed?: boolean
}> = ({children, header, defaultCollapsed = false}) => {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed)
  const [bodyHeight, setBodyHeight] = useState<number>()
  const bodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const setHeight = () => setBodyHeight(bodyRef.current?.getBoundingClientRect().height)
    document.addEventListener('resize', setHeight)
    return () => document.removeEventListener('resize', setHeight)
  }, [])

  return (
    <div className="CollapsibleCard">
      <FlexBox flexDirection='column' gap="0.5rem">
        {header}
        <Button
          isRounded
          kind="text"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <FontAwesomeIcon icon={isCollapsed ? faChevronDown : faChevronUp} />
        </Button>
      </FlexBox>
      <div
        ref={bodyRef}
        style={{maxHeight: isCollapsed ? 0 : bodyHeight}}
        className={`CollapsibleCard__body ${isCollapsed ? 'CollapsibleCard__body--collapsed' : ''}`}
      >
        {children}
      </div>
    </div>
  )
}
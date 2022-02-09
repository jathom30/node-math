import React, { ReactNode } from 'react'
import './MaxHeightContainer.scss'

type MaxHeightContainerType = {
  header?: ReactNode
  footer?: ReactNode
  fullHeight?: boolean
}

export const MaxHeightContainer: React.FC<MaxHeightContainerType> = ({
  header,
  footer,
  fullHeight = false,
  children,
}) => {
  return (
    <div
      className={`MaxHeightContainer ${
        fullHeight ? 'MaxHeightContainer--full-height' : ''
      }`}
    >
      {header && <div className="MaxHeightContainer__header">{header}</div>}
      <div className="MaxHeightContainer__content">{children}</div>
      {footer && <div className="MaxHeightContainer__footer">{footer}</div>}
    </div>
  )
}

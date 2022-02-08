import * as React from 'react';
import './Button.scss'

export const Button: React.FC<{
  onClick: () => void,
  isRounded?: boolean,
  isDisabled?: boolean
  kind?: 'default' | 'primary' | 'danger' | 'text' | 'copy'
}> = ({children, onClick, isRounded = false, kind = 'default', isDisabled = false}) => {
  const buttonKindClass = `Button__${kind}`
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`Button ${isRounded ? 'Button--rounded' : ''} ${isDisabled ? 'Button--disabled' : ''} ${buttonKindClass}`}
    >
      {children}
    </button>
  )
}
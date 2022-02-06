import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import './Modal.scss'

export const Modal: React.FC<{
  offClick?: () => void
}> = ({ children, offClick }) => {
  useEffect(() => {
    window.document.body.style.overflow = 'hidden'
    return () => {
      window.document.body.style.overflow = 'auto'
    }
  }, [])
  return createPortal(
    <div className="Modal">
      <div role="presentation" className="Modal__shade" onClick={offClick} />
      <div className="Modal__content">{children}</div>
    </div>, document.body
  )
}
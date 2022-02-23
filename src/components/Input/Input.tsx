import React, { ReactNode } from 'react';
import './Input.scss'

export const Input: React.FC<{
  label: ReactNode;
  value: string | number;
  onChange: (val: string) => void;
  name: string;
  step?: number
  required?: boolean
}> = ({label, value, onChange, name, step, required = false}) => {
  const type = typeof value === 'string' ? 'string' : 'number'
  return (
    <label className='Input' htmlFor={name}>
      <span className='Input__label'>{label}</span>
      <div className="Input__container">
        <input
          className='Input__input'
          type={type}
          name={name}
          value={value}
          onChange={e => onChange(e.target.value)}
          step={step}
        />
        {required && <div className="Input__dot" />}
      </div>
    </label>
  )
}
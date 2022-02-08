import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'components/Button';
import React, { useEffect, useRef, useState } from 'react';
import  './LabelInput.scss';

type LabelInputType = {
  value: string | number;
  name?: string;
  onSubmit: (val: string | number) => string | void;
  onChange?: (val: string) => string;
  isDisabled?: boolean;
}

export const LabelInput: React.FC<LabelInputType> = ({
  value,
  name,
  onSubmit,
  onChange,
  isDisabled = false,
  children
}) => {
  const [input, setInput] = useState(value);
  const [isEditing, setIsEditing] = useState(false);
  const [displayHeight, setDisplayHeight] = useState<number>();
  const displayRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // set display height so page doesn't adjust if input height is smaller than the display height
  useEffect(() => {
    setDisplayHeight(displayRef.current?.clientHeight);
  }, []);

  // when the user clicks to edit, input should immediately focus
  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const handleCancel = () => {
    setIsEditing(false);
    setInput(value);
  };

  const handleSubmit = () => {
    setInput(onSubmit(input) || input);
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
    if (e.key === 'Escape') {
      handleCancel()
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      setInput(onChange(e.target.value));
    } else {
      setInput(e.target.value);
    }
  };

  return (
    <div className="LabelInput">
      {isEditing ? (
        <div className={`LabelInput__container`} style={{height: displayHeight}}>
          <input
            ref={inputRef}
            className={`LabelInput__input`}
            name={name}
            value={input}
            onChange={handleChange}
            type={typeof value === 'number' ? 'number' : 'text'}
            step={0.01}
            onKeyDown={handleKeyPress}
          />
          <Button onClick={handleCancel} isRounded>
            <FontAwesomeIcon icon={faTimes} />
          </Button>
          <Button
            kind="primary"
            isRounded
            onClick={handleSubmit}>
            <FontAwesomeIcon icon={faCheck} />
          </Button>
        </div>
      ) : (
        <button ref={displayRef} className={`LabelInput__button`} onClick={() => setIsEditing(true)}>
          {children}
        </button>
      )}
    </div>
  );
};

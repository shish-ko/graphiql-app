import React, { FC, useEffect, useRef, useState } from 'react';
import { Input, styled } from '@mui/material';
import { blue } from '@mui/material/colors';

const InputStyle = styled(Input)({
  maxWidth: '80px',
  borderBottom: 'none',
  color: blue[100],
});

interface IEditableInput {
  initText: string;
  active: boolean;
}

const EditableInput: FC<IEditableInput> = ({ initText, active }) => {
  const inputRef = useRef<HTMLElement>(null);
  const [inputVisible, setInputVisible] = useState(false);
  const [text, setText] = useState<string>(initText);

  const onClickOutSide = (e: TouchEvent | MouseEvent) => {
    if (inputRef.current) {
      if (inputRef.current && e.target && !inputRef.current.contains(e.target as Node)) {
        setInputVisible(false);
      }
    }
  };

  const onPressEnter = () => {
    setInputVisible(false);
  };

  useEffect(() => {
    if (inputVisible) {
      document.addEventListener('mousedown', onClickOutSide);
    }
    return () => {
      document.removeEventListener('mousedown', onClickOutSide);
    };
  });

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onPressEnter();
    }
  };

  const handleClick = () => {
    if (active) setInputVisible(true);
  };

  return (
    <div>
      {inputVisible ? (
        <InputStyle
          ref={inputRef}
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          onKeyPress={handleKeyPress}
        />
      ) : (
        <span onClick={handleClick} style={{ cursor: 'pointer' }}>
          {text}
        </span>
      )}
    </div>
  );
};

export default EditableInput;

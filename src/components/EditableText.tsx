import React, { FC, useEffect, useRef, useState } from 'react';
import { Input, styled } from '@mui/material';
import { indigo } from '@mui/material/colors';
import { IEditableInput } from '~interfaces/interfaces';
import { useAlert } from '~utils/userHooks';

const InputStyle = styled(Input)({
  maxWidth: '80px',
  borderBottom: 'none',
  color: indigo[300],
});

const EditableInput: FC<IEditableInput> = ({ initText, active, setTabs }) => {
  const showMsg = useAlert();
  const inputRef = useRef<HTMLElement>(null);
  const [inputVisible, setInputVisible] = useState(false);
  const [text, setText] = useState<string>(initText);

  const onClickOutSide = (e: TouchEvent | MouseEvent) => {
    if (inputRef.current) {
      if (inputRef.current && e.target && !inputRef.current.contains(e.target as Node)) {
        setInputVisible(false);
        setTabs((prevState) => prevState.map((t) => (t.active ? { ...t, title: text } : { ...t })));
      }
    }
  };

  const onPressEnter = () => {
    setInputVisible(false);
    setTabs((prevState) => prevState.map((t) => (t.active ? { ...t, title: text } : { ...t })));
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

  const handleInputText = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.target.value.length > 15) {
      showMsg({ type: 'warning', content: 'The name of the tab should not exceed 15 characters' });
      return;
    }
    setText(e.target.value);
  };

  return (
    <div>
      {inputVisible ? (
        <InputStyle
          ref={inputRef}
          value={text}
          onChange={(e) => {
            handleInputText(e);
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

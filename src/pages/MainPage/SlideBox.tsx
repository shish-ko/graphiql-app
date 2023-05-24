import React, { useState } from 'react';
import { Stack, Typography } from '@mui/material';
import { githubLight } from '@uiw/codemirror-theme-github';
import CodeMirror from '@uiw/react-codemirror';
import { graphql } from 'cm6-graphql';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

interface ISlideBoxProps {
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

export const SlideBox: React.FC<ISlideBoxProps> = ({ setValue }: ISlideBoxProps) => {
  const [isCodeVisible, setCodeVisible] = useState(false);

  const toggleCodeVisibility = () => {
    setCodeVisible(!isCodeVisible);
  };

  return (
    <>
      <Stack
        justifyContent="space-between"
        sx={{ borderTop: '1px solid #8993a4', p: 1 }}
        direction="row"
        gap={1}
      >
        <Stack direction="row" gap={1}>
          <Typography component="div" variant="codeTitle">
            VARIABLES
          </Typography>
          <Typography component="div" variant="codeTitle">
            HEADERS
          </Typography>
        </Stack>
        {isCodeVisible ? (
          <ArrowDropDownIcon
            onClick={toggleCodeVisibility}
            sx={{ cursor: 'pointer', color: '#8993a4' }}
          />
        ) : (
          <ArrowDropUpIcon
            onClick={toggleCodeVisibility}
            sx={{ cursor: 'pointer', color: '#8993a4' }}
          />
        )}
      </Stack>
      {isCodeVisible && (
        <CodeMirror
          height="100px"
          extensions={[graphql()]}
          theme={githubLight}
          onChange={(val) => setValue(val)}
        />
      )}
    </>
  );
};

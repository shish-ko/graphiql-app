import React, { useState } from 'react';
import { Stack, Typography } from '@mui/material';
import { githubLight } from '@uiw/codemirror-theme-github';
import CodeMirror from '@uiw/react-codemirror';
import { graphql } from 'cm6-graphql';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import useTranslation from '~utils/localization';

interface ISlideBoxProps {
  setValue: React.Dispatch<React.SetStateAction<string>>;
  value: string;
}

export const SlideBox: React.FC<ISlideBoxProps> = ({ setValue, value }: ISlideBoxProps) => {
  const [isCodeVisible, setCodeVisible] = useState(false);
  const localization = useTranslation();

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
            {localization.main.variables}
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
          value={value}
          extensions={[graphql()]}
          theme={githubLight}
          onChange={(val) => setValue(val)}
        />
      )}
    </>
  );
};

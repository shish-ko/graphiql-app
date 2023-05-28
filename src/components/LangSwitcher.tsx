import React from 'react';
import { useLanguageContext } from './LanguageContext';
import Avatar from '@mui/material/Avatar';
import enAvatar from '../assets/en.png';
import ruAvatar from '../assets/ru.png';
import { Grid, Typography } from '@mui/material';
import { Stack } from '@mui/system';

export const LangSwitcher: React.FC = () => {
  const { language, changeLanguage } = useLanguageContext();

  const handleLanguageChange = (lang: string) => {
    changeLanguage(lang);
  };

  return (
    <Grid gap={1}>
      {language === 'en' && (
        <Stack
          direction="row"
          gap={1}
          alignItems="center"
          style={{ cursor: 'pointer' }}
          onClick={() => handleLanguageChange('ru')}
        >
          <Typography color="primary">En</Typography>
          <Avatar alt="en" src={enAvatar} />
        </Stack>
      )}
      {language === 'ru' && (
        <Stack
          direction="row"
          gap={1}
          alignItems="center"
          style={{ cursor: 'pointer' }}
          onClick={() => handleLanguageChange('en')}
        >
          <Typography color="primary">Ru</Typography>
          <Avatar alt="ru" src={ruAvatar} />
        </Stack>
      )}
    </Grid>
  );
};

export default LangSwitcher;

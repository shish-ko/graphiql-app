import { Box, Button, Stack, Typography } from '@mui/material';
import { generateText } from '~utils/generateParagraphs';

import './About.scss';
import { useAuthState } from 'react-firebase-hooks/auth';
import { authState } from '~configs/firebase';
import { Link } from 'react-router-dom';
import useTranslation from '~utils/localization';

export const About: React.FC = () => {
  const localization = useTranslation();
  const text = generateText(localization.about.text);
  const [user] = useAuthState(authState);

  return (
    <Stack
      spacing={{ xs: 1, sm: 2 }}
      direction={{ xs: 'column', sm: 'row' }}
      useFlexGap
      alignItems="center"
      justifyContent="center"
    >
      <Stack direction={'column'} useFlexGap>
        <div className="about-header">
          <Typography
            variant="h4"
            color="secondary"
            sx={{ textAlign: { xs: 'center', sm: 'center', md: 'start' } }}
          >
            GraphQL IDE <br /> <small>{localization.aboutApp}</small>
          </Typography>
        </div>
        <Box sx={{ maxWidth: { xs: 'none', sm: 'none', md: '40rem' } }}>{text}</Box>
        <Box sx={{ textAlign: { xs: 'center', sm: 'center', md: 'start' } }}>
          {user && (
            <Button variant="contained" color="secondary">
              <Link to={'/main'} color="inherit">
                Get Started
              </Link>
            </Button>
          )}
        </Box>
      </Stack>
      <Box sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}>
        <img className="image" src={localization.about.link} alt="image" />
      </Box>
    </Stack>
  );
};

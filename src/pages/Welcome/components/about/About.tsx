import { Box, Button, Stack, Typography } from '@mui/material';
import { generateText } from '~utils/generateParagraphs';

import './About.scss';
import { welcome } from '../../../../data/welcome-page';
import { StackDirection } from '~interfaces/*';

export const About: React.FC = () => {
  const text = generateText(welcome.about.text);

  return (
    <Stack
      spacing={{ xs: 1, sm: 2 }}
      direction={{ xs: StackDirection.column, sm: StackDirection.row }}
      useFlexGap
      alignItems="center"
      justifyContent="center"
    >
      <Stack direction={StackDirection.column} useFlexGap>
        <div className="about-header">
          <Typography
            variant="h4"
            color="secondary"
            sx={{ textAlign: { xs: 'center', sm: 'center', md: 'start' } }}
          >
            GraphQL IDE <br /> <small>for better development workflows!</small>
          </Typography>
        </div>
        <div>{text}</div>
        <Box sx={{ textAlign: { xs: 'center', sm: 'center', md: 'start' } }}>
          <Button variant="contained" color="secondary">
            Get Started
          </Button>
        </Box>
      </Stack>
      <Box sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}>
        <img className="image" src={welcome.about.link} alt="image" />
      </Box>
    </Stack>
  );
};

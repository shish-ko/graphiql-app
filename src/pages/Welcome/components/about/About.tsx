import { Button, Stack, Typography } from '@mui/material';
import { generateText } from '~utils/generateParagraphs';

import './About.scss';
import { welcome } from '../../../../data/welcome-page';
import { StackDirection } from '~interfaces/*';

export const About: React.FC = () => {
  const text = generateText(welcome.about.text);

  return (
    <Stack
      spacing={{ xs: 1, sm: 2 }}
      direction={StackDirection.row}
      useFlexGap
      alignItems="center"
      justifyContent="center"
    >
      <Stack direction={StackDirection.column} useFlexGap>
        <div className="about-header">
          <Typography variant="h4" color="secondary">
            GraphQL IDE <br /> <small>for better development workflows!</small>
          </Typography>
        </div>
        <div className="text">{text}</div>
        <div>
          <Button variant="contained" color="secondary">
            Get Started
          </Button>
        </div>
      </Stack>
      <div>
        <img className="image" src={welcome.about.link} alt="image" />
      </div>
    </Stack>
  );
};

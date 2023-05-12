import { Box } from '@mui/material';

export type Text = {
  [key: string]: string;
};

export const generateText = (textObject: Text) => {
  const text = Object.values(textObject).map((paragraph, indx) => (
    <Box key={indx}>
      <p dangerouslySetInnerHTML={{ __html: paragraph }}></p>
      <br />
    </Box>
  ));

  return text;
};

import { ImageCarousel } from '~compos/Carousel';
import { welcome } from '../../../data/welcome-page';
import { Stack, Typography } from '@mui/material';

export const TeamInfo: React.FC = () => {
  return (
    <Stack direction={'column'} spacing={{ xs: 1, sm: 4 }} useFlexGap>
      <Typography variant="h4" style={{ textAlign: 'center' }} color="secondary">
        About our team
      </Typography>
      <ImageCarousel carousel={welcome.team} />
    </Stack>
  );
};

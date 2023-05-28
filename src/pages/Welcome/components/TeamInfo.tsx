import { ImageCarousel } from '~compos/Carousel';
import { Stack, Typography } from '@mui/material';
import useTranslation from '~utils/localization';

export const TeamInfo: React.FC = () => {
  const localization = useTranslation();

  return (
    <Stack direction={'column'} spacing={{ xs: 1, sm: 4 }} useFlexGap>
      <Typography variant="h4" style={{ textAlign: 'center' }} color="secondary">
        {localization.aboutTeam}
      </Typography>
      <ImageCarousel carousel={Object.values(localization.team)} />
    </Stack>
  );
};

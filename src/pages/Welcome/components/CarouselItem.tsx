import { Stack, Typography } from '@mui/material';

export interface CarouselItem {
  image: string;
  title: string;
  text: string;
}

interface CarouselItemProps {
  item: CarouselItem;
}

export const CarouselItem = ({ item }: CarouselItemProps) => {
  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} useFlexGap spacing={{ xs: 1, sm: 4 }}>
      <img
        src={item.image}
        alt={`Carousel Image`}
        style={{
          height: '200px',
          objectFit: 'contain',
        }}
      />
      <Stack direction={'column'} useFlexGap spacing={{ xs: 1, sm: 2 }}>
        <Typography variant="h5">{item.title}</Typography>
        <div>{item.text}</div>
      </Stack>
    </Stack>
  );
};

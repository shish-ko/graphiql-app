import { Stack, Typography } from '@mui/material';
import { StackDirection } from '~interfaces/*';

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
    <Stack direction={StackDirection.row} useFlexGap spacing={{ xs: 1, sm: 4 }}>
      <img
        src={item.image}
        alt={`Carousel Image`}
        style={{
          height: '200px',
          objectFit: 'cover',
        }}
      />
      <Stack direction={StackDirection.column} useFlexGap spacing={{ xs: 1, sm: 2 }}>
        <Typography variant="h5">{item.title}</Typography>
        <div>{item.text}</div>
      </Stack>
    </Stack>
  );
};

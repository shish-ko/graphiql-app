import Carousel from 'react-material-ui-carousel';
import { CarouselItem } from '~pages/Welcome/components/CarouselItem';

interface CarouselProps {
  carousel: CarouselItem[];
}

export const ImageCarousel = ({ carousel }: CarouselProps) => {
  const carouselStyles = {
    maxWidth: '500px',
    maxHeight: '300px',
    width: '45%',
    height: '100%',
    margin: '0 auto',
  };

  return (
    <div style={carouselStyles}>
      <Carousel autoPlay={true} interval={2000}>
        {carousel.map((item, index) => (
          <CarouselItem key={index} item={item} />
        ))}
      </Carousel>
    </div>
  );
};

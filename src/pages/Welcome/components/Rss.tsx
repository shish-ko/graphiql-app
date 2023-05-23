import { Template } from './template/Template';
import { welcome } from '../../../data/welcome-page';

export const Rss: React.FC = () => {
  return (
    <Template
      text={welcome.rss.text}
      imgUrl={welcome.rss.link}
      direction={{ xs: 'column', sm: 'row' }}
    />
  );
};

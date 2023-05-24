import { Template } from './template/Template';
import { welcome } from '../../../data/welcome-page';

export const Info: React.FC = () => {
  return (
    <Template
      text={welcome.info.text}
      imgUrl={welcome.info.link}
      direction={{ xs: 'column', sm: 'row-reverse' }}
    />
  );
};

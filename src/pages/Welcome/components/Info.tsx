import { Template } from './template/Template';
import { welcome } from '../../../data/welcome-page';
import { StackDirection } from '../../../interfaces/interfaces';

export const Info: React.FC = () => {
  return (
    <Template
      text={welcome.info.text}
      imgUrl={welcome.info.link}
      direction={{ xs: StackDirection.column, sm: StackDirection.reverse }}
    />
  );
};

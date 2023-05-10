import { Template } from './template/Template';
import { welcome } from '../../../data/welcome-page';
import { StackDirection } from '../../../interfaces/interfaces';

export const Rss: React.FC = () => {
  return (
    <Template text={welcome.rss.text} imgUrl={welcome.rss.link} direction={StackDirection.row} />
  );
};

import useTranslation from '~utils/localization';
import { Template } from './template/Template';

export const Rss: React.FC = () => {
  const localization = useTranslation();

  return (
    <Template
      text={localization.rss.text}
      imgUrl={localization.rss.link}
      direction={{ xs: 'column', sm: 'row' }}
    />
  );
};

import useTranslation from '~utils/localization';
import { Template } from './template/Template';

export const Info: React.FC = () => {
  const localization = useTranslation();

  return (
    <Template
      text={localization.info.text}
      imgUrl={localization.info.link}
      direction={{ xs: 'column', sm: 'row-reverse' }}
    />
  );
};

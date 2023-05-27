import LocalizedStrings from 'react-localization';
import { useLanguageContext } from '../components/LanguageContext';

import en from '../data/en';
import ru from '../data/ru';

export default function useTranslation() {
  const { language } = useLanguageContext();

  const localization = new LocalizedStrings({
    en,
    ru,
  });

  localization.setLanguage(language);
  return localization;
}

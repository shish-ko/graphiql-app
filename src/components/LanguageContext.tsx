import React, { useState, useContext, useEffect, ReactNode } from 'react';
import { langKey } from '~utils/localization';

const LanguageContext = React.createContext({
  language: 'en',
  changeLanguage: (lang: string) => {},
});

export const useLanguageContext = () => useContext(LanguageContext);

interface LanguageContextProviderProps {
  children: ReactNode;
}

export default function LanguageContextProvider({ children }: LanguageContextProviderProps) {
  const [language, changeLanguage] = useState('en');

  useEffect(() => {
    const storedLanguage = localStorage.getItem(langKey);
    if (storedLanguage) {
      changeLanguage(storedLanguage);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

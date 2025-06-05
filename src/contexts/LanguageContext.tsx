import React, { createContext, useState, useContext, ReactNode } from "react";

// Define available languages
export type Language = "ua" | "ru" | "en";

// Define translation structure
export interface Translations {
  [key: string]: {
    ua: string;
    ru: string;
    en: string;
  };
}

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

interface LanguageProviderProps {
  children: ReactNode;
  initialTranslations: Translations;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
  initialTranslations,
}) => {
  // Change default language from 'ua' to 'ua' (no actual change needed, but confirming it's already set to Ukrainian)
  const [language, setLanguage] = useState<Language>("ua");
  const [translations, setTranslations] =
    useState<Translations>(initialTranslations);

  const t = (key: string): string => {
    if (translations[key] && translations[key][language]) {
      return translations[key][language];
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

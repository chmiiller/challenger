type Translations = {
  [languageCode: string]: {
    [key: string]: string;
  };
};

const translations: Translations = {
  en: {
    searchPlaceHolder: 'Search artists, events, places...',
  },
};

const defaultLanguage: string = 'en';

export function localize(key: string, language: string = defaultLanguage): string {
  if (translations[language] && translations[language][key]) {
    return translations[language][key];
  }

  if (translations[defaultLanguage] && translations[defaultLanguage][key]) {
    return translations[defaultLanguage][key];
  }

  return `key: ${key} not found`;
}
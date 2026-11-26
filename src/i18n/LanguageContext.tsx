import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Lang } from '../data/gameData';
import { TRANSLATIONS, type TranslationDict } from './translations';

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  t: TranslationDict;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window !== 'undefined') {
      const saved = window.localStorage.getItem('pactkeeper_lang');
      if (saved === 'en' || saved === 'vi') return saved;
    }
    return 'en';
  });

  useEffect(() => {
    window.localStorage.setItem('pactkeeper_lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (next: Lang) => setLangState(next);
  const toggleLang = () => setLangState((prev) => (prev === 'en' ? 'vi' : 'en'));

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t: TRANSLATIONS[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}

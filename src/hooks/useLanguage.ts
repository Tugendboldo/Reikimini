import { useState, useCallback } from 'react';
import { type Language, translations } from '@/data/translations';

export function useLanguage() {
  const [language, setLanguage] = useState<Language>('de');
  const t = translations[language];
  const cycleLanguage = useCallback(() => {
    setLanguage((prev) => {
      const order: Language[] = ['de', 'en', 'es'];
      return order[(order.indexOf(prev) + 1) % order.length];
    });
  }, []);
  return { language, setLanguage, cycleLanguage, t };
}

import { useSelector, useDispatch } from 'react-redux';
import { toggleLanguage, setLanguage } from '../state/uiSlice';
import { translations } from '../i18n/translations';

export const useLanguage = () => {
  const dispatch = useDispatch();
  const language = useSelector((state) => state.ui.language) || 'en';

  const t = (key) => {
    const langDict = translations[language] || translations.en;
    return langDict[key] || translations.en[key] || key;
  };

  const handleToggleLanguage = () => {
    dispatch(toggleLanguage());
  };

  const handleSetLanguage = (lang) => {
    dispatch(setLanguage(lang));
  };

  return {
    language,
    isHindi: language === 'hi',
    t,
    toggleLanguage: handleToggleLanguage,
    setLanguage: handleSetLanguage,
  };
};

export default useLanguage;

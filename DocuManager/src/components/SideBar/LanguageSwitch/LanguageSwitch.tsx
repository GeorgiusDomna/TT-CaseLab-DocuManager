import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './languageSwitch.module.css';

const LanguageSwitch: React.FC = () => {
  const { i18n } = useTranslation();
  const [isRu, setIsRu] = useState(
    localStorage.getItem('lng') ? localStorage.getItem('lng') === 'ru' : true
  );

  const handleClickLng = (e: React.MouseEvent<HTMLButtonElement>) => {
    const lng = (e.target as HTMLButtonElement).dataset.lng;
    setIsRu(!isRu);
    if (lng) {
      i18n.changeLanguage(lng);
      localStorage.setItem('lng', lng);
    }
  };

  return (
    <div className={styles.language}>
      <button onClick={handleClickLng} className={isRu ? styles.lngActive : ''} data-lng='ru'>
        RU
      </button>
      <button onClick={handleClickLng} className={!isRu ? styles.lngActive : ''} data-lng='en'>
        EN
      </button>
    </div>
  );
};

export default LanguageSwitch;

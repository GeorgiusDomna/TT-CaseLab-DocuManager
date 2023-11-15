import { useEffect, useState } from 'react';
import { fetchFolderContents } from '../../api/documentService';
import { ResourceMetadata } from '../../interfaces/blank';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CategoryItem from '../CategoryItem/CategoryItem';
import styles from './navigation.module.css';
import categoryItemStyles from '../CategoryItem/categoryItem.module.css';
import { Localization } from '@/enums/Localization';

function Navigation() {
  const [data, setData] = useState<ResourceMetadata[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchFolderContents();
      setData(result || []);
    };
    fetchData();
  }, []);
  return (
    <>
      <h3>{t(Localization.CATEGORIES)}</h3>
      <ul className={styles.navigation}>
        <li className={categoryItemStyles.categoryItem}>
          <NavLink to={'/'}>{t(Localization.ALL_DOCUMENTS)}</NavLink>
        </li>
        {data.map((item) => (
          <CategoryItem key={item.resource_id} category={item.name} />
        ))}
      </ul>
    </>
  );
}

export default Navigation;

import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CategoryItem from '../CategoryItem/CategoryItem';
import styles from './navigation.module.css';
import categoryItemStyles from '../CategoryItem/categoryItem.module.css';
import { IResourceMetadata } from '@/interfaces/IResourceMetadata';
import { Localization } from '@/enums/Localization';

interface INavigationProps {
  categoryList: IResourceMetadata[];
}

function Navigation({ categoryList }: INavigationProps): React.ReactElement {
  const { t } = useTranslation();

  return (
    <>
      <h3>{t(Localization.CATEGORIES)}</h3>
      <ul className={styles.navigation}>
        <li className={categoryItemStyles.categoryItem}>
          <NavLink to={'/'}>{t(Localization.ALL_DOCUMENTS)}</NavLink>
        </li>
        {categoryList.map((item) => (
          <CategoryItem key={item.name} category={item.name} />
        ))}
        <li className={categoryItemStyles.categoryItem}>
          <NavLink to={'/trash'}>{t(Localization.BASKET)}</NavLink>
        </li>
      </ul>
    </>
  );
}

export default Navigation;

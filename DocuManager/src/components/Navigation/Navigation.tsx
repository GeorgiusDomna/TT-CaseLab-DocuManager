import { useTranslation } from 'react-i18next';
import CategoryItem from '../CategoryItem/CategoryItem';
import styles from './navigation.module.css';
import { IResourceMetadata } from '@/interfaces/IResourceMetadata';
import { Localization } from '@/enums/Localization';

interface INavigationProps {
  categoryList: IResourceMetadata[];
}

function Navigation({ categoryList }: INavigationProps): React.ReactElement {
  const { t } = useTranslation();

  return (
    <>
      <h3 className={styles.title}>{t(Localization.CATEGORIES)}</h3>
      <div className={styles.navigation}>
        <CategoryItem type={'allFiles'} category={t(Localization.ALL_DOCUMENTS)} />
        {categoryList.map((item) => (
          <CategoryItem key={item.name} category={item.name} />
        ))}
        <CategoryItem type={'trash'} category={t(Localization.BASKET)} />
      </div>
    </>
  );
}

export default Navigation;

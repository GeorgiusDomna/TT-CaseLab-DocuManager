import { useTranslation } from 'react-i18next';
import CategoryItem from '../CategoryItem/CategoryItem';
import styles from './navigation.module.css';
import { IResourceMetadata } from '@/interfaces/IResourceMetadata';
import { Localization } from '@/enums/Localization';
import { observer } from 'mobx-react-lite';

interface INavigationProps {
  categoryList: IResourceMetadata[];
}

const Navigation: React.FC<INavigationProps> = observer(({ categoryList }) => {
  const { t } = useTranslation();

  return (
    <>
      <h3 className={styles.title} data-testid={'Navigation-title'}>
        {t(Localization.CATEGORIES)}
      </h3>
      <div className={styles.navigation}>
        <CategoryItem type={'allFiles'} category={t(Localization.ALL_DOCUMENTS)} />
        {categoryList.map((item) => (
          <CategoryItem key={item.name} category={item.name} />
        ))}
        <CategoryItem type={'trash'} category={t(Localization.BASKET)} />
      </div>
    </>
  );
});

export default Navigation;

import { NavLink } from 'react-router-dom';
import CategoryItem from '../CategoryItem/CategoryItem';
import styles from './navigation.module.css';
import categoryItemStyles from '../CategoryItem/categoryItem.module.css';
import { IResourceMetadata } from '@/interfaces/IResourceMetadata';

interface INavigationProps {
  categoryList: IResourceMetadata[];
}

function Navigation({ categoryList }: INavigationProps): React.ReactElement {
  return (
    <>
      <h3>Категории</h3>
      <ul className={styles.navBar}>
        <li className={categoryItemStyles.categoryItem}>
          <NavLink to={'/'}>Все категории</NavLink>
        </li>
        {categoryList.map((item) => (
          <CategoryItem key={item.name} category={item.name} />
        ))}
        <CategoryItem key={'trash'} category={'trash'} />
      </ul>
    </>
  );
}

export default Navigation;

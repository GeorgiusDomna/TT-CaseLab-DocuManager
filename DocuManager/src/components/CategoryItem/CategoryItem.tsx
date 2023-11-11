import styles from './categoryItem.module.css';
import { NavLink } from 'react-router-dom';

function CategoryItem({ data }: { data: string }) {
  return (
    <div className={styles.categoryItem}>
      <NavLink to={`/categories/${data}`}>{data}</NavLink>
    </div>
  );
}

export default CategoryItem;

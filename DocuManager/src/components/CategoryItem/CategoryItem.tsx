import styles from './categoryItem.module.css';
import { NavLink } from 'react-router-dom';

interface CategoryItemProps {
  data: string;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ data }) => {
  const encodeData = encodeURIComponent(data);
  return (
    <div className={styles.categoryItem}>
      <NavLink to={data === 'Все категории' ? '/' : `/categories/${encodeData}`}>{data}</NavLink>
    </div>
  );
};

export default CategoryItem;

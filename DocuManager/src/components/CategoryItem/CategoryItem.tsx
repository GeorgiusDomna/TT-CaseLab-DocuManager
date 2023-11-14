import styles from './categoryItem.module.css';
import { NavLink } from 'react-router-dom';
interface CategoryItemProps {
  category: string;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ category }) => {
  const encodeData = encodeURIComponent(category);
  return (
    <li className={styles.categoryItem}>
      <NavLink
        to={`/categories/${encodeData}`}
        className={({ isActive }) => (isActive ? styles.active : styles.categoryIcon)}
      >
        {category}
      </NavLink>
    </li>
  );
};

export default CategoryItem;

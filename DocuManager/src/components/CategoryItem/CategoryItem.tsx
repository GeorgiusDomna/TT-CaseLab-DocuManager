import styles from './categoryItem.module.css';
import { NavLink } from 'react-router-dom';
//import icons from './icons/folder.svg'
interface CategoryItemProps {
  category: string;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ category }) => {
  const encodeData = encodeURIComponent(category);
  return (
    <li className={styles.categoryItem}>
      <img src={`./icons/folder.svg`} alt={category} />
      <NavLink to={`/categories/${encodeData}`}>{category}</NavLink>
    </li>
  );
};

export default CategoryItem;

import styles from './categoryItem.module.css';
import { NavLink } from 'react-router-dom';

interface CategoryItemProps {
  category: string;
  type?: string;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ category, type = 'default' }) => {
  let path: string = '/';
  switch (type) {
    case 'default':
      path = `/categories/${encodeURIComponent(category)}`;
      break;
    case 'allFiles':
      path = '/';
      break;
    case 'trash':
      path = '/trash';
      break;
  }
  return (
    <NavLink
      className={({ isActive }) => [styles.categoryItem, isActive && styles.active].join(' ')}
      to={path}
    >
      <div
        className={[styles.categoryItem_icon, styles[`categoryItem_icon_${type}`]].join(' ')}
      ></div>
      {category}
    </NavLink>
  );
};

export default CategoryItem;

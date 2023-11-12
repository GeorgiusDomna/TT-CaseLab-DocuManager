import styles from './categoryItem.module.css';

interface CategoryItemProps {
  category: string;
}
const CategoryItem: React.FC<CategoryItemProps> = ({ category }) => {
  return <li className={styles.categoryItem}>{category}</li>;
};
export default CategoryItem;

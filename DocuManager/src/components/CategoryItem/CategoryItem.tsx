import styles from './categoryItem.module.css';

function CategoryItem({ data }) {
  return <div className={styles.categoryItem}>{data}</div>;
}

export default CategoryItem;

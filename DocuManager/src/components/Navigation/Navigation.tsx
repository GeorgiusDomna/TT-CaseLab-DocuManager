import { useState } from 'react';
import CategoryItem from '../CategoryItem/CategoryItem';
import styles from './navigation.module.css';

function Navigation() {
  const [categoryList, setCategoryList] = useState(['Frontend', 'Backend', 'Disign']);

  return (
    <div className={styles.navBar}>
      <h3>Категории</h3>
      <ul>
        {categoryList.map((data, index) => (
          <CategoryItem key={index} data={data} />
        ))}
      </ul>
    </div>
  );
}

export default Navigation;

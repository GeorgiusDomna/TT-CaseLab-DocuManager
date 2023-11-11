import React from 'react';
import { useState } from 'react';
import CategoryItem from '../CategoryItem/CategoryItem.tsx';
import styles from './navigation.module.css';

function Navigation() {
  const [categoryList, setCategoryList] = useState(['Frontend', 'Backend', 'Disign']);

  return (
    <div className={styles.navBar}>
      <h3>Категории</h3>
      <ul>
          <CategoryItem/>
      </ul>
    </div>
  );
}

export default Navigation;

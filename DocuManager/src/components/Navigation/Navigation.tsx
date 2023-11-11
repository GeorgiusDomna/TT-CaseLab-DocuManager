import React from 'react';
import CategoryItem from '../CategoryItem/CategoryItem';
import styles from './navigation.module.css';

function Navigation() {

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

import CategoryItem from '../CategoryItem/CategoryItem';
import styles from './navigation.module.css';

function Navigation() {

  return (
   <>
      <h3>Категории</h3>
      <ul className={styles.navBar}>
          <CategoryItem/>
      </ul>
   </>
  );
}

export default Navigation;

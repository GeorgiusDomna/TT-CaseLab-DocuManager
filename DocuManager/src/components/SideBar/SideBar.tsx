import NewCategoryCreator from '../NewCategoryCreator/newCategoryCreator';
import Navigation from '../Navigation/Navigation';
import styles from './sideBar.module.css';

function SideBar() {
  return (
    <div className={styles.sideBar}>
      <Navigation />
      <NewCategoryCreator />
    </div>
  );
}

export default SideBar;

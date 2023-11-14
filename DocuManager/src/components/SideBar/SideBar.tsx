import Navigation from '../Navigation/Navigation';
import styles from './sideBar.module.css';

function SideBar() {
  return (
    <div className={styles.sideBar}>
      <Navigation />
    </div>
  );
}

export default SideBar;

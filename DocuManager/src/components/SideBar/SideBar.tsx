import Navigation from '../Navigation/Navigation';
import LanguageSwitch from '../LanguageSwitch/LanguageSwitch';
import styles from './sideBar.module.css';

function SideBar() {
  return (
    <div className={styles.sideBar}>
      <Navigation />
      <LanguageSwitch />
    </div>
  );
}

export default SideBar;

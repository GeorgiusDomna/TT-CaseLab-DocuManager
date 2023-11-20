import styles from './footer.module.css';
import ghIcon from '../../assets/github_icon.png';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <a href='https://github.com/GeorgiusDomna/TT-CaseLab-DocuManager'>
        <img src={ghIcon} alt='gh icon' />
      </a>
      <span>2023</span>
    </footer>
  );
};

export default Footer;

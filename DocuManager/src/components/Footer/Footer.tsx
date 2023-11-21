import styles from './footer.module.css';
import ghIcon from '../../assets/github_icon.png';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <a
        className={styles.link}
        href='https://github.com/GeorgiusDomna/TT-CaseLab-DocuManager'
        target='_blank'
        rel='noreferrer'
      >
        <img src={ghIcon} alt='gh icon' />
        <span>2023</span>
      </a>
    </footer>
  );
};

export default Footer;

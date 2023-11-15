import style from './footer.module.css';
import pathToImg from '../../assets/github.svg';
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <>
      <footer className={style.footer}>
        <Link to='https://github.com/GeorgiusDomna/TT-CaseLab-DocuManager' target='_blank'>
          <div className={style.contentGit}>
            <h1>Git repository</h1>
            <img src={pathToImg} />
          </div>
        </Link>
        <Link to='https://greenatomcaselab.ispringlearn.ru/content/info/16574' target='_blank'>
          <div className={style.contentCaseLab}>
            <h1>Project for CaseLab 2023</h1>
          </div>
        </Link>
      </footer>
    </>
  );
};
export default Footer;

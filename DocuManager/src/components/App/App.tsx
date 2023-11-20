import { Route, Routes } from 'react-router-dom';
import ContentBlock from '../ContentBlock/ContentBlock';
import SideBar from '../SideBar/SideBar';
import Footer from '../Footer/Footer';
import Alert from '../Alert/Alert';
import { observer } from 'mobx-react-lite';
import alertStore from '@/stores/AlertStore';
import styles from './app.module.css';

const App: React.FC = observer(() => {
  const { isOpen, message, toggleAlert } = alertStore;
  return (
    <>
      <div className={[styles.app, isOpen && styles.openAlert].join(' ')}>
        <SideBar />
        <Routes>
          <Route path='/' element={<ContentBlock />} />
          <Route path='/categories/:categoryName' element={<ContentBlock />} />
          <Route path='/trash' element={<ContentBlock />} />
        </Routes>
        <Footer />
      </div>
      {isOpen && <Alert message={message} toggleAlert={toggleAlert} />}
    </>
  );
});

export default App;

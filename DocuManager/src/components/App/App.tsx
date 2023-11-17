import { Route, Routes } from 'react-router-dom';
import ContentBlock from '../ContentBlock/ContentBlock';
import SideBar from '../SideBar/SideBar';
import styles from './app.module.css';

function App() {
  return (
    <div className={styles.app}>
      <SideBar />
      <Routes>
        <Route path='/' element={<ContentBlock />} />
        <Route path='/categories/:id' element={<ContentBlock />} />
        <Route path='/trash' element={<ContentBlock />} />
      </Routes>
    </div>
  );
}

export default App;

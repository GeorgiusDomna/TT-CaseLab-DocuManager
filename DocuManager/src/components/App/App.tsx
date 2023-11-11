import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';

import SideBar from '../SideBar/SideBar';
import Loading from '../Loading/Loading';
import styles from './app.module.css';

const ContentBlock = lazy(() => import('../ContentBlock/ContentBlock'));

function App() {
  return (
    <div className={styles.app}>
      <SideBar />
      <Suspense fallback={<Loading type={'spinningBubbles'} color={'#ECECEC'} />}>
        <Routes>
          <Route path='/' element={<ContentBlock />} />
          <Route path='/categories/:id?' element={<ContentBlock />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;

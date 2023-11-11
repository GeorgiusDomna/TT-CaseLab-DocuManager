import React from 'react';
import SideBar from '../SideBar/SideBar';
import ContentBlock from '../ContentBlock/ContentBlock';
import styles from './app.module.css';


function App() {
  return (
    <div className={styles.app}>
      <SideBar />
      <ContentBlock />
    </div>
  );
}

export default App;

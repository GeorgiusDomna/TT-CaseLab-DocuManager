import { useState } from 'react';
import SideBar from '../SideBar/SideBar';
import ContentBlock from '../ContentBlock/ContentBlock';
import './app.css';
import documentData from '../../interfaces/documentData';

function App() {
  const [contentData, setContentData] = useState<documentData[]>([]);
  const [contentHeader, setContentHeader] = useState('Все категории');

  function categoryClick(data: documentData[], header: string) {
    setContentData(data);
    setContentHeader(header);
  }

  return (
    <div className='App'>
      <SideBar handler={categoryClick} />
      <ContentBlock data={contentData} header={contentHeader} />
    </div>
  );
}

export default App;

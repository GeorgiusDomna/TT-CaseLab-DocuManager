import { useState } from 'react';
import DocumentItem from '../DocumentItem/DocumentItem';
import './contentBlock.css';

function ContentBlock() {
  const [documentList, setDocumentList] = useState([
    'Bears.png',
    'Moscow.png',
    'Mountains.png',
    'Winter.png',
  ]);

  return (
    <div className='contentBlock'>
      <h2>Все документы</h2>
      <ul className='documentList'>
        {documentList.map((item, index) => (
          <DocumentItem key={index} data={item} />
        ))}
      </ul>
    </div>
  );
}

export default ContentBlock;

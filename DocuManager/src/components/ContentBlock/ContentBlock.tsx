import { useState } from 'react';
import DocumentItem from '../DocumentItem/DocumentItem';
import styles from './contentBlock.module.css';

function ContentBlock() {
  const [documentList] = useState([
    'Bears.png',
    'Moscow.png',
    'Mountains.png',
    'Winter.png',
  ]);

  return (
    <div className={styles.contentBlock}>
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

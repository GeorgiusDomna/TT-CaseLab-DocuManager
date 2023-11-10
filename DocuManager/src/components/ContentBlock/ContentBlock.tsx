import { useState } from 'react';
import DocumentItem from '../DocumentItem/DocumentItem';
import styles from './contentBlock.module.css';
import documentData from '../../interfaces/documentData';

interface ContentBlockProps {
  data: documentData[];
  header: string;
}

function ContentBlock({ data, header }: ContentBlockProps) {
  const [documentList, setDocumentList] = useState(data);

  // const handlers = {
  //   addItem(data: documentData) {
  //     setDocumentList((list) => [...list, data]);
  //   },
  //   deleteItem(id: number) {
  //     setDocumentList((list) => list.filter((el) => el.id !== id));
  //   },
  //   renameItem(id: number, newName: string) {
  //     setDocumentList((list) =>
  //       list.map((el) => {
  //         if (el.id === id) el.name = newName;
  //         return el;
  //       })
  //     );
  //   },
  // };

  return (
    <div className={styles.contentBlock}>
      <h2 className={styles.contentBlock__title}>{header}</h2>
      <ul className={styles.contentBlock__documentList}>
        {documentList.map((item) => (
          <DocumentItem key={item.id} data={item} handlers={handlers} />
        ))}
      </ul>
    </div>
  );
}

export default ContentBlock;

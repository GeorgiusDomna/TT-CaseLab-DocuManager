import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DocumentItem from '../DocumentItem/DocumentItem';
import styles from './contentBlock.module.css';
import documentData from '../../interfaces/documentData';

function ContentBlock() {
  const [documentList, setDocumentList] = useState<documentData[]>([]);
  const [title, setTitle] = useState('Все документы');
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      //Функция получения документов из категории
      setTimeout(() => {}, 2000);
      setTitle(id);
    } else {
      //Функция получения всех документов
    }
  }, [id]);

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
      <h2 className={styles.contentBlock__title}>{title}</h2>
      <ul className={styles.contentBlock__documentList}>
        {documentList.map((item) => (
          <DocumentItem key={item.id} />
        ))}
      </ul>
    </div>
  );
}

export default ContentBlock;

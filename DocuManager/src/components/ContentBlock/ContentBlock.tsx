import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DocumentItem from '../DocumentItem/DocumentItem';
import styles from './contentBlock.module.css';
import documentData from '../../interfaces/documentData';
import { getAllFiles } from '../../api/documentService';
import { getFilesFromDir } from '../../api/documentService';

function ContentBlock() {
  const [documentList, setDocumentList] = useState<documentData[]>([]);
  const [title, setTitle] = useState('Все документы');
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let files: documentData[];
        if (id) {
          // Получение документов из категории
          files = await getFilesFromDir(id);
          setTitle(id);
        } else {
          // Получение всех документов
          files = await getAllFiles();
          setTitle('Все документы');
        }
        setDocumentList(files);
      } catch (error) {
        console.error('Error fetching data:', error); // TODO ERROR
      }
    };
    fetchData();
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
          <>
            <DocumentItem key={item.name} />
            <span>
              {item.name} <br />{' '}
            </span>
          </>
        ))}
      </ul>
    </div>
  );
}

export default ContentBlock;

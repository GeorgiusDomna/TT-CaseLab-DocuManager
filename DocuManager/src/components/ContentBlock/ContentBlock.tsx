import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DocumentItem from '../DocumentItem/DocumentItem';
import styles from './contentBlock.module.css';
import documentData from '../../interfaces/documentData';
import { getAllFiles } from '../../api/documentService';
import { getFilesFromDir } from '../../api/documentService';
import Loading from '../Loading/Loading';

const ContentBlock: React.FC = () => {
  const [documentList, setDocumentList] = useState<documentData[]>([]);
  const [title, setTitle] = useState('Все документы');

  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        let files: documentData[];
        if (id) {
          const decodeId = decodeURIComponent(id);
          files = await getFilesFromDir(decodeId);
          setTitle(decodeId);
        } else {
          files = await getAllFiles();
          setTitle('Все документы');
        }
        setDocumentList(files);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error); // TODO ERROR
      }
    };
    fetchData();
  }, [id]);

  const handlers = {
    addItem(data: documentData) {
      setDocumentList((list) => [...list, data]);
    },
    deleteItem(name: string) {
      setDocumentList((list) => list.filter((el) => el.name !== name));
    },
    renameItem(oldName: string, newName: string) {
      setDocumentList((list) =>
        list.map((el) => {
          if (el.name === oldName) el.name = newName;
          return el;
        })
      );
    },
  };

  if (isLoading) return <Loading type={'spinningBubbles'} color={'#bdbdbd'} />;

  return (
    <div className={styles.contentBlock}>
      <h2 className={styles.contentBlock__title}>{title}</h2>
      <ul className={styles.contentBlock__documentList}>
        {documentList.map((item) => (
          <DocumentItem key={item.name} data={item.name} handlers={handlers} />
        ))}
      </ul>
    </div>
  );
};

export default ContentBlock;

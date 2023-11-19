import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import DocumentItem from '../DocumentItem/DocumentItem';
import styles from './contentBlock.module.css';
import documentData from '../../interfaces/documentData';
import { getAllFiles, getFilesFromBasket } from '../../api/documentService';
import { getFilesFromDir } from '../../api/documentService';
import Loading from '../Loading/Loading';
import { useLocation } from 'react-router-dom';
import { Localization } from '@/enums/Localization';

const ContentBlock: React.FC = () => {
  const { t } = useTranslation();
  const [documentList, setDocumentList] = useState<documentData[]>([]);
  const [title, setTitle] = useState(t(Localization.ALL_DOCUMENTS));

  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();

  const location = useLocation();

  useEffect(() => {
    if (title === 'Все документы' || title === 'All documents') {
      setTitle(t(Localization.ALL_DOCUMENTS));
    }
    if (title === 'Корзина' || title === 'Basket') {
      setTitle(t(Localization.BASKET));
    }
  }, [t]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const route = location.pathname;
      try {
        let files: documentData[];
        if (route === '/') {
          files = await getAllFiles();
          setTitle(t(Localization.ALL_DOCUMENTS));
        } else if (route === '/trash') {
          files = await getFilesFromBasket();
          setTitle(t(Localization.BASKET));
        } else {
          const decodeId = decodeURIComponent(id);
          files = await getFilesFromDir(decodeId);
          setTitle(decodeId);
        }
        setDocumentList(files);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error); // TODO ERROR
      }
    };
    fetchData();
  }, [location]);

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
          <DocumentItem key={item.name} data={item.name} path={item.path} handlers={handlers} file={item.file} />
        ))}
      </ul>
    </div>
  );
};

export default ContentBlock;

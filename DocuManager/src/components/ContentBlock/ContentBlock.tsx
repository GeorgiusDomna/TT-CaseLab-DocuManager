import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { Localization } from '@/enums/Localization';
import { observer } from 'mobx-react-lite';

import DocumentItem from './DocumentItem/DocumentItem';
import documentData from '../../interfaces/documentData';
import Loading from './Loading/Loading';

import { getAllFiles, getFilesFromBasket } from '../../api/documentService';
import { getFilesFromDir } from '../../api/documentService';
import documentStore from '@/stores/DocumentStore';

import styles from './contentBlock.module.css';

const ContentBlock: React.FC = observer(() => {
  const { t } = useTranslation();

  const { documentList, setDocumentList } = documentStore;
  const [title, setTitle] = useState(t(Localization.ALL_DOCUMENTS));
  const [isLoading, setIsLoading] = useState(false);

  const { categoryName } = useParams();
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
      try {
        setIsLoading(true);
        const route = location.pathname;
        let files: documentData[];
        if (route === '/') {
          files = await getAllFiles();
          setTitle(t(Localization.ALL_DOCUMENTS));
        } else if (route === '/trash') {
          files = await getFilesFromBasket();
          setTitle(t(Localization.BASKET));
        } else {
          const decodeId = decodeURIComponent(categoryName as string);
          files = await getFilesFromDir(decodeId);
          setTitle(decodeId);
        }
        if (!files) throw new Error('Data retrieval error');
        setDocumentList(files);
        setIsLoading(false);
      } catch (error) {
        setDocumentList([]);
      }
    };
    fetchData();
  }, [location]);

  if (isLoading) return <Loading type={'spinningBubbles'} color={'#bdbdbd'} />;

  return (
    <div className={styles.contentBlock}>
      <h2 className={styles.contentBlock__title}>{title}</h2>
      <ul className={styles.contentBlock__documentList}>
        {documentList.map((item) => (
          <DocumentItem
            key={item.resource_id}
            data={item.name}
            path={item.path}
            file={item.file}
            id={item.resource_id}
          />
        ))}
      </ul>
    </div>
  );
});

export default ContentBlock;

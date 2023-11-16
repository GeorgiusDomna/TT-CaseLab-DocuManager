import { useEffect, useState } from 'react';
import { fetchFolderContents } from '@/api/documentService';
import { IResourceMetadata } from '@/interfaces/IResourceMetadata';
import NewCategoryCreator from '../NewCategoryCreator/newCategoryCreator';
import Navigation from '../Navigation/Navigation';
import LanguageSwitch from '../LanguageSwitch/LanguageSwitch';
import styles from './sideBar.module.css';

function SideBar(): React.ReactElement {
  const [categoryList, setCategoryList] = useState<IResourceMetadata[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchFolderContents();
      response && setCategoryList(response);
    };
    fetchData();
  }, []);
  return (
    <div className={styles.sideBar}>
      <Navigation categoryList={categoryList} />
      <NewCategoryCreator categoryList={categoryList} setCategoryList={setCategoryList} />
      <LanguageSwitch />
    </div>
  );
}

export default SideBar;

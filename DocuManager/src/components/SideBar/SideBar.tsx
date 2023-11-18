import { useEffect, useState } from 'react';
import { fetchFolderContents } from '@/api/documentService';
import { IResourceMetadata } from '@/interfaces/IResourceMetadata';
import NewCategoryCreator from '../NewCategoryCreator/newCategoryCreator';
import Navigation from '../Navigation/Navigation';
import LanguageSwitch from '../LanguageSwitch/LanguageSwitch';
import SideBarButton from './SideBarButton/SideBarButton';
import styles from './sideBar.module.css';

function SideBar(): React.ReactElement {
  const [categoryList, setCategoryList] = useState<IResourceMetadata[]>([]);
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchFolderContents();
      response && setCategoryList(response);
    };
    fetchData();
  }, []);

  function clickHandler() {
    setIsShown(!isShown);
  }

  return (
    <div className={[styles.sideBar, isShown ? styles.sideBar_shown : ''].join(' ')}>
      <Navigation categoryList={categoryList} />
      <NewCategoryCreator categoryList={categoryList} setCategoryList={setCategoryList} />
      <SideBarButton clickHandler={clickHandler} />
      <LanguageSwitch />
    </div>
  );
}

export default SideBar;

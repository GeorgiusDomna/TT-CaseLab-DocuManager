import { useEffect, useState } from 'react';
import { fetchFolderContents } from '@/api/documentService';
import NewCategoryCreator from './NewCategoryCreator/newCategoryCreator';
import Navigation from './Navigation/Navigation';
import LanguageSwitch from './LanguageSwitch/LanguageSwitch';
import SideBarButton from './SideBarButton/SideBarButton';
import styles from './sideBar.module.css';
import FormUploadDocument from './FormUploadDocument/FormUploadDocument';
import { observer } from 'mobx-react-lite';
import categoryStore from '@/stores/CategoryStore';

const SideBar: React.FC = observer(() => {
  const { categoryList, setCategoryList, addNewCategory } = categoryStore;
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
    <div
      className={[styles.sideBar, isShown ? styles.sideBar_shown : ''].join(' ')}
      data-testid={'SideBar'}
    >
      <Navigation categoryList={categoryList} />
      <NewCategoryCreator addNewCategory={addNewCategory} />
      <FormUploadDocument categoryList={categoryList} />
      <SideBarButton clickHandler={clickHandler} />
      <LanguageSwitch />
    </div>
  );
});

export default SideBar;

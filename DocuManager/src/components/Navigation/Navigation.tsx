import { useEffect, useState } from 'react';
import CategoryItem from '../CategoryItem/CategoryItem';
import { fetchFolderContents } from '../../api/documentService';
import { FileOrFolder } from '../../interfaces/blank';
import styles from './navigation.module.css';

function Navigation() {
  const [data, setData] = useState<FileOrFolder[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchFolderContents();
      setData(result || []);
    };
    fetchData();
  }, []);
  return (
    <>
      <h3>Категории</h3>
      <ul className={styles.navBar}>
        {data.map((item, id: number) => (
          <CategoryItem key={id} category={item.name} />
        ))}
      </ul>
    </>
  );
}

export default Navigation;

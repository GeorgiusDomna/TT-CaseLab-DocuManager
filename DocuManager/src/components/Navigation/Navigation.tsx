import { useEffect, useState } from 'react';
import { fetchFolderContents } from '../../api/documentService';
import { ResourceMetadata } from '../../interfaces/blank';
import { NavLink } from 'react-router-dom';
import CategoryItem from '../CategoryItem/CategoryItem';
import styles from './navigation.module.css';
import categoryItemStyles from '../CategoryItem/categoryItem.module.css';

function Navigation() {
  const [data, setData] = useState<ResourceMetadata[]>([]);
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
      <ul className={styles.navigation}>
        {data.map((item) => (
          <CategoryItem key={item.resource_id} category={item.name} />
        ))}
      </ul>
    </>
  );
}

export default Navigation;

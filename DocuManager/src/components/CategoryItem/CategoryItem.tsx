import styles from './categoryItem.module.css';
import { useEffect, useState } from "react"
import { fetchFolderContents } from '../../api/documentService';
import { FileOrFolder } from '../../interfaces/blank';
import React from 'react';
export const CategoryItem = () => {
  const [data, setData] = useState<FileOrFolder[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchFolderContents();
      setData(result || []);
     
      
    };
    fetchData();
    console.log(data);
  }, [])
  return (
    <div className={styles.categoryItem}>
      {
        data.map((item, id) =>
          <div key={id}>{item.name}</div >
        )
      }
    </div>

  )
}

export default CategoryItem;

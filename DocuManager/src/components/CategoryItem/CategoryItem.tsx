import styles from './categoryItem.module.css';
import { useEffect, useState } from "react"
import { fetchFolderContents } from '../../api/documentService';
import { FileOrFolder } from '../../interfaces/blank';

export const CategoryItem= () => {
const handleItemClick=(itemName:string)=>{
  console.log(`Выбранная категория ${itemName}`); 
}

  const [data, setData] = useState<FileOrFolder[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchFolderContents();
      setData(result || []); 
    };
    fetchData();
  }, [])
  return (
    <>
      {
        data.map((item, id) =>(
          <li key={id} onClick={()=>handleItemClick(item.name)}className={styles.categoryItem}>{item.name}</li>
        )
      )}
    </>

  )
}

export default CategoryItem;
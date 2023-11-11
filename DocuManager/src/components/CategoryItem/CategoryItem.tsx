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
    <div className={styles.categoryItem}>
      {
        data.map((item, id) =>(
          <li key={id} onClick={()=>handleItemClick(item.name)}>{item.name}</li>
        )
      )}
    </div>

  )
}

export default CategoryItem;

{/* interface CategoryItemProps{
  categories:string[];
  onItemClick:(category:string)=>void
} */}
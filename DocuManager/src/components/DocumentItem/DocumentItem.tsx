import styles from './documentItem.module.css';
interface DocumentItemProps {
  data: string;
}
const DocumentItem: React.FC<DocumentItemProps> = ({ data }) => {
  return <div className={styles.documentList_item}>{data}</div>;
};

export default DocumentItem;

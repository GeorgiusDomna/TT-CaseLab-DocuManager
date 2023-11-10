import styles from './documentItem.module.css';

function DocumentItem({ data }) {
  return <div className={styles.documentList_item}>{data}</div>;
}

export default DocumentItem;

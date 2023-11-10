import styles from './documentItem.module.css';

function DocumentItem({ data, handlers }) {
  return <div className={styles.documentList_item}>{data}</div>;
}

export default DocumentItem;

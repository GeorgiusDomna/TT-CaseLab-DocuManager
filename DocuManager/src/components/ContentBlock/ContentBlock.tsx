import { useState } from 'react';
import DocumentItem from '../DocumentItem/DocumentItem';
import classes from './contentBlock.module.css';
import documentData from '../../interfaces/documentData';

interface ContentBlockProps {
  data: documentData[];
  header: string;
}

function ContentBlock({ data, header }: ContentBlockProps) {
  const [documentList, setDocumentList] = useState(data);

  return (
    <div className={classes.contentBlock}>
      <h2 className={classes.contentBlock__title}>{header}</h2>
      <ul className={classes.contentBlock__documentList}>
        {documentList.map((item) => (
          <DocumentItem key={item.id} data={item} />
        ))}
      </ul>
    </div>
  );
}

export default ContentBlock;

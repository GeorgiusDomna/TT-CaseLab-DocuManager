import ReactLoading, { LoadingType } from 'react-loading';
import styles from './Loading.module.css';

interface LoadingProps {
  type: LoadingType;
  color: string;
}

function Loading({ type, color }: LoadingProps) {
  return (
    <div className={styles.loading}>
      <ReactLoading type={type} color={color} height={50} width={50} />
    </div>
  );
}

export default Loading;

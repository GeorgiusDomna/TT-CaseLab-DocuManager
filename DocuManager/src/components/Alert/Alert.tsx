import { observer } from 'mobx-react-lite';
import styles from './alert.module.css';

interface IAlert {
  message: string;
  toggleAlert: () => void;
}

const Alert: React.FC<IAlert> = observer(({ message, toggleAlert }) => {
  return (
    <div className={`${styles.alert} ${styles.close}`}>
      <div className={styles.message}>{message}</div>
      <button onClick={toggleAlert}>Продолжить</button>
    </div>
  );
});

export default Alert;

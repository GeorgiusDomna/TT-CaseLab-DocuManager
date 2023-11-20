import Modal from 'react-modal';
import styles from './modalwindow.module.css';
import alertStore from '@/stores/AlertStore';
import { isOnline } from '@/utils/blank';

interface ModalWindowProps {
  data: string;
  isOpenModalWindow: boolean;
  toggleModalWindow: () => void;
  file: string;
}

Modal.setAppElement('#root');

const ModalWindow: React.FC<ModalWindowProps> = ({
  data,
  isOpenModalWindow,
  toggleModalWindow,
  file,
}) => {
  const handleImageError = () => {
    toggleModalWindow();
    alertStore.toggleAlert(
      !isOnline() ? 'Нет интернет соединения.' : 'Ошибка при загрузки изображения.'
    );
  };
  return (
    <Modal isOpen={isOpenModalWindow} contentLabel='Модальное окно' className={styles.modal}>
      <div className={styles.modal__header}>
        <img
          src={'../../src/assets/close.svg'}
          className={styles.modal__close}
          onClick={toggleModalWindow}
        />
      </div>
      <div className={styles.modal__img}>
        <img src={file} onError={handleImageError} alt='Close' />
      </div>
      <p>{data}</p>
    </Modal>
  );
};

export default ModalWindow;

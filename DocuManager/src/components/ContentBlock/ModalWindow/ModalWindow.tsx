import Modal from 'react-modal';
import alertStore from '@/stores/AlertStore';
import styles from './modalwindow.module.css';
import closeIcon from '@/assets/cancel.svg';

interface ModalWindowProps {
  data: string;
  isOpenModalWindow: boolean;
  toggleModalWindow: () => void;
  file: string;
}

if (process.env.NODE_ENV !== 'test') Modal.setAppElement('#root');

const ModalWindow: React.FC<ModalWindowProps> = ({
  data,
  isOpenModalWindow,
  toggleModalWindow,
  file,
}) => {
  const handleImageError = () => {
    toggleModalWindow();
    alertStore.toggleAlert('Ошибка при загрузке изображения');
  };
  return (
    <Modal isOpen={isOpenModalWindow} contentLabel='Модальное окно' className={styles.modal}>
      <div className={styles.modal__header}>
        <img src={closeIcon} className={styles.modal__close} onClick={toggleModalWindow} />
      </div>
      <div className={styles.modal__img}>
        <img src={file} onError={handleImageError} />
      </div>
      <p>{data}</p>
    </Modal>
  );
};

export default ModalWindow;

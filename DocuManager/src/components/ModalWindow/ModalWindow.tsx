import Modal from 'react-modal';
import styles from './modalwindow.module.css';

interface ModalWindowProps {
  data: string;
  isOpenModalWindow: boolean;
  closeModalWindow: () => void;
  file: string;
}

Modal.setAppElement('#root');

const ModalWindow: React.FC<ModalWindowProps> = ({
  data,
  isOpenModalWindow,
  closeModalWindow,
  file,
}) => {
  return (
    <Modal isOpen={isOpenModalWindow} contentLabel='Модальное окно' className={styles.modal}>
      <div className={styles.modal__header}>
        <img
          src={'../../src/assets/close.svg'}
          className={styles.modal__close}
          onClick={closeModalWindow}
        />
      </div>
      <div className={styles.modal__img}>
        <img src={file} />
      </div>
      <p>{data}</p>
    </Modal>
  );
};

export default ModalWindow;

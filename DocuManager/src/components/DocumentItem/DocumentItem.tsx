import { ChangeEvent, useState } from 'react';
import styles from './documentItem.module.css';
import ModalWindow from '../ModalWindow/ModalWindow';

interface DocumentItemProps {
  data: string;
  handlers: unknown;
  file: string;
}

const DocumentItem: React.FC<DocumentItemProps> = ({ data, file }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenRenamePanel, setIsOpenRenamePanel] = useState(false);
  const [isOpenMovePanel, setIsOpenMovePanel] = useState(false);
  const [isOpenModalWindow, setIsOpenModalWindow] = useState(false);

  const [selectValue, setSelectValue] = useState('');
  const [newNameValue, setNewNameValue] = useState('');

  const handleSelectValue = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(event.target.value);
  };

  const handleChangeNewNameValue = (event: ChangeEvent<HTMLInputElement>) => {
    setNewNameValue(event.target.value);
  };

  const handleViewDocument = () => {
    setIsOpenModalWindow(true);
  };

  const closeModalWindow = () => {
    setIsOpenModalWindow(false);
  };

  const toggleOption = () => {
    setIsOpen(!isOpen);
    setIsOpenRenamePanel(false);
    setIsOpenMovePanel(false);
  };

  const toggleMovePanel = () => {
    setIsOpenMovePanel(!isOpenMovePanel);
    setIsOpenRenamePanel(false);
    setSelectValue('');
    setNewNameValue('');
  };

  const toggleRenamePanel = () => {
    setIsOpenRenamePanel(!isOpenRenamePanel);
    setIsOpenMovePanel(false);
    setSelectValue('');
    setNewNameValue('');
  };

  const resetForms = () => {
    setIsOpenRenamePanel(false);
    setIsOpenMovePanel(false);
    setSelectValue('');
    setNewNameValue('');
  };

  const handleDeleteDocument = () => {
    resetForms();
  };

  return (
    <li className={styles.document}>
      <div className={`${styles.document__item} ${isOpen ? styles.document__item_opened : ''}`}>
        <div className={styles.document__titleContainer}>
          <div className={styles.document__iconDocument}></div>
          <p className={styles.document__title}>{data}</p>
        </div>
        <ul className={styles.document__buttons}>
          {isOpen && (
            <>
              <li>
                <button
                  className={[
                    styles.document__buttonIcon,
                    styles.document__buttonIcon_type_view,
                  ].join(' ')}
                  type='button'
                  title='Просмотреть документ'
                  onClick={handleViewDocument}
                ></button>
              </li>
              <li>
                <button
                  className={[
                    styles.document__buttonIcon,
                    styles.document__buttonIcon_type_rename,
                  ].join(' ')}
                  type='button'
                  title='Переименовать документ'
                  onClick={toggleRenamePanel}
                ></button>
              </li>
              <li>
                <button
                  className={[
                    styles.document__buttonIcon,
                    styles.document__buttonIcon_type_toggle,
                  ].join(' ')}
                  type='button'
                  title='Переместить документ'
                  onClick={toggleMovePanel}
                ></button>
              </li>
              <li>
                <button
                  className={[
                    styles.document__buttonIcon,
                    styles.document__buttonIcon_type_busket,
                  ].join(' ')}
                  type='button'
                  title='Удалить документ'
                  onClick={handleDeleteDocument}
                ></button>
              </li>
            </>
          )}
          <li>
            <button
              className={[
                styles.document__buttonIcon,
                styles.document__buttonIcon_type_option,
              ].join(' ')}
              type='button'
              title='Открыть панель взаимодействия с документом'
              onClick={toggleOption}
            ></button>
          </li>
        </ul>
      </div>
      {isOpenMovePanel && (
        <form className={styles.document__form} name='change-document'>
          <select
            className={styles.document__select}
            name='select-change-document'
            onChange={handleSelectValue}
            defaultValue=''
          >
            <option className={styles.document__option} disabled value=''>
              Выберите категорию
            </option>
            <option value='1'>Главная папка</option>
          </select>
          <button className={styles.document__button} type='submit' disabled={!selectValue}>
            Переместить
          </button>
        </form>
      )}
      {isOpenRenamePanel && (
        <form className={styles.document__form} name='change-document'>
          <input
            className={styles.document__select}
            type='text'
            placeholder='Новое название'
            value={newNameValue}
            onChange={handleChangeNewNameValue}
          />
          <button className={styles.document__button} type='submit' disabled={!newNameValue}>
            Переименовать
          </button>
        </form>
      )}
      {isOpenModalWindow && (
        <ModalWindow
          data={data}
          isOpenModalWindow={isOpenModalWindow}
          closeModalWindow={closeModalWindow}
          file={file}
        ></ModalWindow>
      )}
    </li>
  );
};

export default DocumentItem;

import { ChangeEvent, useState } from 'react';
import styles from './documentItem.module.css';
import ButtonIcon from '../ButtonIcon/ButtonIcon';
import FormRenameDocument from '../FormRenameDocument/FormRenameDocument';
import FormMoveDocument from '../FormMoveDocument/FormMoveDocument';
interface DocumentItemProps {
  data: string;
  handlers: unknown;
}

const DocumentItem: React.FC<DocumentItemProps> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenRenamePanel, setIsOpenRenamePanel] = useState(false);
  const [isOpenMovePanel, setIsOpenMovePanel] = useState(false);

  const [selectValue, setSelectValue] = useState('');
  const [newNameValue, setNewNameValue] = useState('');

  const handleSelectValue = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(event.target.value);
  };

  const handleChangeNewNameValue = (event: ChangeEvent<HTMLInputElement>) => {
    setNewNameValue(event.target.value);
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

  const handleViewDocument = () => {
    resetForms();
  };

  const buttonsIcon = [
    {
      id: 1,
      typeStyle: 'view',
      title: 'Просмотреть документ',
      onClick: handleViewDocument,
    },
    {
      id: 2,
      typeStyle: 'rename',
      title: 'Переименовать документ',
      onClick: toggleRenamePanel,
    },
    {
      id: 3,
      typeStyle: 'move',
      title: 'Переместить документ',
      onClick: toggleMovePanel,
    },
    {
      id: 4,
      typeStyle: 'delete',
      title: 'Удалить документ',
      onClick: handleDeleteDocument,
    },
  ];

  return (
    <li className={styles.document}>
      <div className={`${styles.document__item} ${isOpen ? styles.document__item_opened : ''}`}>
        <div className={styles.document__titleContainer}>
          <div className={styles.document__iconDocument}></div>
          <p className={styles.document__title}>{data}</p>
        </div>
        <ul className={styles.document__buttons}>
          {isOpen &&
            buttonsIcon.map(({ id, typeStyle, title, onClick }) => (
              <li key={id}>
                <ButtonIcon typeStyle={typeStyle} title={title} onClick={onClick} />
              </li>
            ))}
          <li>
            <ButtonIcon
              typeStyle='option'
              title='Открыть панель взаимодействия с документом'
              onClick={toggleOption}
            />
          </li>
        </ul>
      </div>
      {isOpenMovePanel && (
        <FormMoveDocument selectValue={selectValue} onChange={handleSelectValue} />
      )}
      {isOpenRenamePanel && (
        <FormRenameDocument newNameValue={newNameValue} onChange={handleChangeNewNameValue} />
      )}
    </li>
  );
};

export default DocumentItem;

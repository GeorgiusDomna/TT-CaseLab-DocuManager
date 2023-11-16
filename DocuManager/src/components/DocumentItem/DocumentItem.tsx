import { ChangeEvent, useState } from 'react';
import styles from './documentItem.module.css';
import ButtonIcon from '../ButtonIcon/ButtonIcon';
import FormRenameDocument from '../FormRenameDocument/FormRenameDocument';
import FormMoveDocument from '../FormMoveDocument/FormMoveDocument';
import { useTranslation } from 'react-i18next';
import { Localization } from '@/enums/Localization';

interface DocumentItemProps {
  data: string;
  handlers: unknown;
  currentCategory: string;
}

const DocumentItem: React.FC<DocumentItemProps> = ({data, currentCategory}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenRenamePanel, setIsOpenRenamePanel] = useState(false);
  const [isOpenMovePanel, setIsOpenMovePanel] = useState(false);

  const [selectValue, setSelectValue] = useState('');
  const [newNameValue, setNewNameValue] = useState('');

  const { t } = useTranslation();

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
      title: t(Localization.SEE),
      onClick: handleViewDocument,
    },
    {
      id: 2,
      typeStyle: 'rename',
      title: t(Localization.RENAME_DOC),
      onClick: toggleRenamePanel,
    },
    {
      id: 3,
      typeStyle: 'move',
      title: t(Localization.MOVE_DOC),
      onClick: toggleMovePanel,
    },
    {
      id: 4,
      typeStyle: 'delete',
      title: t(Localization.DELETE),
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
              title={t(Localization.SETTINGS)}
              onClick={toggleOption}
            />
          </li>
        </ul>
      </div>
      {isOpenMovePanel && (
        <FormMoveDocument name='form-move' selectValue={selectValue} currentCategory={currentCategory} currentFile={data}  onChange={handleSelectValue} />
      )}
      {isOpenRenamePanel && (
        <FormRenameDocument
          name='form-rename'
          newNameValue={newNameValue}
          onChange={handleChangeNewNameValue}
        />
      )}
    </li>
  );
};

export default DocumentItem;

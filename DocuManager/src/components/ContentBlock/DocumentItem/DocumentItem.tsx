import { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Localization } from '@/enums/Localization';
import { useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import ModalWindow from '../ModalWindow/ModalWindow';
import ButtonImg from '../ButtonImg/ButtonImg';
import FormRenameDocument from '../FormRenameDocument/FormRenameDocument';
import FormMoveDocument from '../FormMoveDocument/FormMoveDocument';

import { deleteDocumentOnServer, RecoveryDocumentOnServer } from '../../../api/documentService';
import documentStore from '@/stores/DocumentStore';
import alertStore from '@/stores/AlertStore';
import { networkCheck } from '@/utils/networkStatus';

import styles from './documentItem.module.css';

let isNet = false;

interface DocumentItemProps {
  data: string;
  path: string;
  file: string;
  id: string;
}

const DocumentItem: React.FC<DocumentItemProps> = observer(({ data, file, path, id }) => {
  const location = useLocation();
  const route = location.pathname;
  const { deleteDocument, renameDocument } = documentStore;
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenRenamePanel, setIsOpenRenamePanel] = useState(false);
  const [isOpenMovePanel, setIsOpenMovePanel] = useState(false);
  const [isOpenModalWindow, setIsOpenModalWindow] = useState(false);
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
    if (!isNet) {
      if (networkCheck()) {
        isNet = true;
      }
    }
    if (isNet) {
      setIsOpen(!isOpen);
      setIsOpenRenamePanel(false);
      setIsOpenMovePanel(false);
    }
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
    setIsOpen(!isOpen);
    setIsOpenRenamePanel(false);
    setIsOpenMovePanel(false);
    setSelectValue('');
    setNewNameValue('');
  };

  const handleDeleteDocument = () => {
    deleteDocumentOnServer(path)
      .then((result) => {
        if (result) {
          deleteDocument(id);
          resetForms();
        }
      })
      .catch((error) => {
        alertStore.toggleAlert(error.message);
      });
  };

  const handleRecoveryDocument = () => {
    RecoveryDocumentOnServer(path)
      .then((result) => {
        if (result) {
          deleteDocument(id);
          resetForms();
        }
      })
      .catch((error) => {
        alertStore.toggleAlert(error.message);
      });
  };

  const toggleModalWindow = () => {
    networkCheck() && setIsOpenModalWindow(!isOpenModalWindow);
  };

  const buttonsIcon = [
    {
      id: 1,
      typeStyle: 'view',
      title: t(Localization.SEE),
      onClick: toggleModalWindow,
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

  const buttonsIconTrash = [
    {
      id: 1,
      typeStyle: 'view',
      title: t(Localization.SEE),
      onClick: toggleModalWindow,
    },
    {
      id: 2,
      typeStyle: 'delete',
      title: t(Localization.DELETE),
      onClick: handleDeleteDocument,
    },
    {
      id: 3,
      typeStyle: 'recovery',
      title: t(Localization.RECOVERY),
      onClick: handleRecoveryDocument,
    },
  ];

  return (
    <li className={styles.document}>
      <div className={`${styles.document__item} ${isOpen ? styles.document__item_opened : ''}`}>
        <div className={styles.document__titleContainer}>
          <div className={styles.document__iconDocument}></div>
          <p className={styles.document__title} title={data}>
            {data}
          </p>
        </div>
        <ul
          className={[styles.document__buttons, isOpen ? styles.document__buttons_opened : ''].join(
            ' '
          )}
        >
          {isOpen &&
            route !== '/trash' &&
            buttonsIcon.map(({ id, typeStyle, title, onClick }) => (
              <li key={id}>
                <ButtonImg typeStyle={typeStyle} title={title} onClick={onClick} />
              </li>
            ))}
          {isOpen &&
            route === '/trash' &&
            buttonsIconTrash.map(({ id, typeStyle, title, onClick }) => (
              <li key={id}>
                <ButtonImg typeStyle={typeStyle} title={title} onClick={onClick} />
              </li>
            ))}
          <li>
            <ButtonImg typeStyle='option' title={t(Localization.SETTINGS)} onClick={toggleOption} />
          </li>
        </ul>
      </div>
      {isOpenMovePanel && (
        <FormMoveDocument
          name='form-move'
          path={path}
          id={id}
          selectValue={selectValue}
          deleteDocument={deleteDocument}
          onChange={handleSelectValue}
          resetForms={resetForms}
        />
      )}
      {isOpenRenamePanel && (
        <FormRenameDocument
          name='form-rename'
          newNameValue={newNameValue}
          id={id}
          path={path}
          renameDocument={renameDocument}
          onChange={handleChangeNewNameValue}
          resetForms={resetForms}
        />
      )}
      <ModalWindow
        data={data}
        isOpenModalWindow={isOpenModalWindow}
        toggleModalWindow={toggleModalWindow}
        file={file}
      />
    </li>
  );
});

export default DocumentItem;

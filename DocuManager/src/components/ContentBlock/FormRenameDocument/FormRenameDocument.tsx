import { ChangeEvent, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Localization } from '@/enums/Localization';
import Button from '../Button/Button';
import styles from './formrenamedocument.module.css';
import { moveDocument } from '@/api/documentService.ts';

interface FormRenameDocumentProps {
  newNameValue: string;
  name: string;
  path: string;
  id: string;
  renameDocument: (resource_id: string, newName: string) => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  resetForms: () => void;
}

const FormRenameDocument: React.FC<FormRenameDocumentProps> = ({
  newNameValue,
  name,
  path,
  id,
  onChange,
  renameDocument,
  resetForms,
}) => {
  const handleRenameDocument = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    renameFile(path);
  };

  const renameFile = async (path: string) => {
    const splitedPath = path.split('/');
    const newPath = Array.from(splitedPath, (element, index) =>
      index === splitedPath.length - 1 ? newNameValue : element
    ).join('/');
    const result = await moveDocument(newPath, path, true);

    if (typeof result !== 'boolean' && result?.status === 201) {
      renameDocument(id, newNameValue);
      resetForms();
    }
  };

  const { t } = useTranslation();

  return (
    <form className={styles.document__form} name={name} onSubmit={handleRenameDocument}>
      <input
        className={styles.document__input}
        type='text'
        placeholder={t(Localization.NEW_NAME)}
        value={newNameValue}
        onChange={onChange}
      />
      <Button text={t(Localization.RENAME)} type='submit' disabled={!newNameValue} />
    </form>
  );
};

export default FormRenameDocument;

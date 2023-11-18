import { ChangeEvent, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Localization } from '@/enums/Localization';
import Button from '../Button/Button';
import styles from './formrenamedocument.module.css';
import {moveDocument} from "@/api/documentService.ts";

interface FormRenameDocumentProps {
  newNameValue: string;
  path: string;
  handlers: unknown;
  name: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const FormRenameDocument: React.FC<FormRenameDocumentProps> = ({
  newNameValue,
  path,
  handlers,
  name,
  onChange,
}) => {
  const handleRenameDocument = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const splitedPath = path.split('/')
    const newPath = Array.from(splitedPath, (element, index) => index === splitedPath.length - 1 ? newNameValue : element).join('/');
    renameDocument(splitedPath.pop()||'', newPath)
  };

  const renameDocument = async (oldName:string,newPath:string,overwrite:boolean=true) => {
    const result = await moveDocument(newPath, path, overwrite)
    if (result.status === 201) {
      handlers.renameItem(oldName,newNameValue)
      alert('щОк')
    }
  }

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

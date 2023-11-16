import { ChangeEvent, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Localization } from '@/enums/Localization';
import Button from '../Button/Button';
import styles from './formrenamedocument.module.css';

interface FormRenameDocumentProps {
  newNameValue: string;
  name: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const FormRenameDocument: React.FC<FormRenameDocumentProps> = ({
  newNameValue,
  name,
  onChange,
}) => {
  const handleRenameDocument = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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

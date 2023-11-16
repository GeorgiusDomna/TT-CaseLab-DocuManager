import { ChangeEvent, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Localization } from '@/enums/Localization';
import Button from '../Button/Button';
import styles from './formmovedocument.module.css';

interface FormMoveDocumentProps {
  selectValue: string;
  name: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const FormMoveDocument: React.FC<FormMoveDocumentProps> = ({ selectValue, name, onChange }) => {
  const handleMoveDocument = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const { t } = useTranslation();

  return (
    <form className={styles.document__form} name={name} onSubmit={handleMoveDocument}>
      <select
        className={styles.document__select}
        name='select-change-document'
        onChange={onChange}
        defaultValue=''
      >
        <option className={styles.document__option} disabled value=''>
          {t(Localization.CHOOSE_CATEGORY)}
        </option>
        <option value='1'>{t(Localization.MAIN_FOLDER)}</option>
      </select>
      <Button text={t(Localization.MOVE)} type='submit' disabled={!selectValue} />
    </form>
  );
};

export default FormMoveDocument;

import { ChangeEvent, FormEvent } from 'react';
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

  return (
    <form className={styles.document__form} name={name} onSubmit={handleMoveDocument}>
      <select
        className={styles.document__select}
        name='select-change-document'
        onChange={onChange}
        defaultValue=''
      >
        <option className={styles.document__option} disabled value=''>
          Выберите категорию
        </option>
        <option value='1'>Главная папка</option>
      </select>
      <Button text='Переместить' type='submit' disabled={!selectValue} />
    </form>
  );
};

export default FormMoveDocument;

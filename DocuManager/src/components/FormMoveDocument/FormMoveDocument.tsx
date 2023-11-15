import { ChangeEvent, FormEvent } from 'react';
import Button from '../Button/Button';
import Form from '../Form/Form';
import styles from './formmovedocument.module.css';

interface FormMoveDocumentProps {
  selectValue: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const FormMoveDocument: React.FC<FormMoveDocumentProps> = ({ selectValue, onChange }) => {
  const handleMoveDocument = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <Form name='form-move' onSubmit={handleMoveDocument}>
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
    </Form>
  );
};

export default FormMoveDocument;

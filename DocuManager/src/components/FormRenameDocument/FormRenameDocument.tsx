import { ChangeEvent, FormEvent } from 'react';
import Button from '../Button/Button';
import Form from '../Form/Form';
import styles from './formrenamedocument.module.css';

interface FormRenameDocumentProps {
  newNameValue: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const FormRenameDocument: React.FC<FormRenameDocumentProps> = ({ newNameValue, onChange }) => {
  const handleRenameDocument = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <Form name='form-rename' onSubmit={handleRenameDocument}>
      <input
        className={styles.document__input}
        type='text'
        placeholder='Новое название'
        value={newNameValue}
        onChange={onChange}
      />
      <Button text='Переименовать' type='submit' disabled={!newNameValue} />
    </Form>
  );
};

export default FormRenameDocument;

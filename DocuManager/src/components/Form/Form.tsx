import { FormEvent, ReactNode } from 'react';
import styles from './form.module.css';

interface FormProps {
  name: string;
  children: ReactNode;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

const Form: React.FC<FormProps> = ({ name, children, onSubmit }) => {
  return (
    <form className={styles.document__form} name={name} onSubmit={onSubmit}>
      {children}
    </form>
  );
};

export default Form;

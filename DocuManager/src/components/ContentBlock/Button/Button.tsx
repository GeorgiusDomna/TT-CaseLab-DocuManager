import styles from './button.module.css';

interface ButtonProps {
  text: string;
  type: 'submit' | 'button' | 'reset';
  disabled: boolean;
}

const Button: React.FC<ButtonProps> = ({ type, text, disabled }) => {
  return (
    <button className={styles.document__button} type={type} disabled={disabled}>
      {text}
    </button>
  );
};

export default Button;

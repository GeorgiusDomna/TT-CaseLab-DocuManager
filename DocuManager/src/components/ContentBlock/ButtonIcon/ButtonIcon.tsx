import styles from './buttonIcon.module.css';

interface ButtonIconProps {
  title: string;
  typeStyle: string;
  onClick: () => void;
}

const ButtonIcon: React.FC<ButtonIconProps> = ({ typeStyle, title, onClick }) => {
  return (
    <button
      className={[
        styles.document__buttonIcon,
        styles[`document__buttonIcon_type_${typeStyle}`],
      ].join(' ')}
      type='button'
      title={title}
      onClick={onClick}
    ></button>
  );
};

export default ButtonIcon;

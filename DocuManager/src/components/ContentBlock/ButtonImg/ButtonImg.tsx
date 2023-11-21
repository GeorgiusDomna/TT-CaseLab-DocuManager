import styles from './buttonImg.module.css';

interface ButtonImgProps {
  title: string;
  typeStyle: string;
  onClick: () => void;
}

const ButtonImg: React.FC<ButtonImgProps> = ({ typeStyle, title, onClick }) => {
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

export default ButtonImg;

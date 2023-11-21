import { useState } from 'react';
import styles from './sideBarButton.module.css';
import sideBarIcon from '../../../assets/sideBarArrow.png';

interface SideBarButtonProps {
  clickHandler: () => void;
}

const SideBarButton: React.FC<SideBarButtonProps> = ({ clickHandler }) => {
  const [iconStyle, setIconStyle] = useState(false);

  function handler() {
    setIconStyle(!iconStyle);
    clickHandler();
  }

  return (
    <button
      className={[styles.sideBar__button, iconStyle ? styles.sideBar__button_reverse : ''].join(
        ' '
      )}
      onClick={handler}
    >
      <img src={sideBarIcon} alt='x' />
    </button>
  );
};

export default SideBarButton;

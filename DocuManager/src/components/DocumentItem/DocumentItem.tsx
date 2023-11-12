import { ChangeEvent, useState } from 'react';
import styles from './documentItem.module.css';
interface DocumentItemProps {
  data: string;
}
const DocumentItem: React.FC<DocumentItemProps> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectValue, setSelectValue] = useState('');

  const handleSelectValue = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(event.target.value);
  };

  const toggleOption = () => {
    setIsOpen(!isOpen);
  };

  return (
    <li className={styles.document}>
      <div className={`${styles.document__item} ${isOpen ? styles.document__item_opened : ''}`}>
        <div className={styles.document__titleContainer}>
          <div className={styles.document__iconDocument}></div>
          <p className={styles.document__title}>{data}</p>
        </div>
        {isOpen ? (
          <ul className={styles.document__buttons}>
            <li>
              <button
                className={[
                  styles.document__buttonIcon,
                  styles.document__buttonIcon_type_view,
                ].join(' ')}
                type='button'
                title='Просмотреть документ'
              ></button>
            </li>
            <li>
              <button
                className={[
                  styles.document__buttonIcon,
                  styles.document__buttonIcon_type_toggle,
                ].join(' ')}
                type='button'
                title='Скрыть панель'
                onClick={toggleOption}
              ></button>
            </li>
            <li>
              <button
                className={[
                  styles.document__buttonIcon,
                  styles.document__buttonIcon_type_busket,
                ].join(' ')}
                type='button'
                title='Удалить документ'
              ></button>
            </li>
          </ul>
        ) : (
          <button
            className={[styles.document__buttonIcon, styles.document__buttonIcon_type_option].join(
              ' '
            )}
            type='button'
            title='Открыть панель'
            onClick={toggleOption}
          ></button>
        )}
      </div>
      {isOpen && (
        <form className={styles.document__form} name='change-document'>
          <select
            className={styles.document__select}
            name='select-change-document'
            onChange={handleSelectValue}
            defaultValue=''
          >
            <option className={styles.document__option} disabled value=''>
              Выберите категорию
            </option>
            <option value='1'>Главная папка</option>
          </select>
          <button className={styles.document__button} type='submit' disabled={!selectValue}>
            Переместить
          </button>
        </form>
      )}
    </li>
  );
};

export default DocumentItem;

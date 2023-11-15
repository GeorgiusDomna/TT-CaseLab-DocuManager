import { ChangeEvent, useEffect, useRef, useState } from 'react';
import styles from './newCategoryCreator.module.css';

function NewCategoryCreator(): React.ReactNode {
  const [isCategoryCreatorOpen, setCategoryCreatorOpen] = useState<boolean>(false);
  const [newNameCategory, setNewNameCategory] = useState<string>('');
  const newCategoryInput = useRef<HTMLInputElement | null>(null);

  const toggleCategoryCreator = () => {
    setCategoryCreatorOpen(!isCategoryCreatorOpen);
  };

  useEffect(() => {
    isCategoryCreatorOpen && newCategoryInput.current?.focus();
  }, [isCategoryCreatorOpen]);

  const handleChangeNewNameValue = (event: ChangeEvent<HTMLInputElement>) => {
    setNewNameCategory(event.target.value);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toggleCategoryCreator();
    // отправка запроса на сервер
    setNewNameCategory('');
  };

  return (
    <div className={styles.categoryCreator}>
      {!isCategoryCreatorOpen ? (
        <button
          className={[styles.categoryCreator_button, styles.categoryCreator_openButton].join(' ')}
          type='button'
          title='Создать новую категорию'
          onClick={toggleCategoryCreator}
        >
          <div className={styles.categoryCreator_openButton_icon}></div>
          Создать новую категорию
        </button>
      ) : (
        <form onSubmit={handleFormSubmit} className={styles.categoryCreator_form}>
          <input
            ref={newCategoryInput}
            className={styles.categoryCreator_input}
            type='text'
            placeholder='Название новой категории'
            value={newNameCategory}
            onChange={handleChangeNewNameValue}
          />
          <button
            className={[styles.categoryCreator_button, styles.categoryCreator_submitButton].join(' ')}
            type='submit'
            title='Создать'
          >
            Создать
          </button>
        </form>
      )}
    </div>
  );
}

export default NewCategoryCreator;

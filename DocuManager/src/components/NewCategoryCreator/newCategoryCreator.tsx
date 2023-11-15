import { ChangeEvent, useEffect, useRef, useState } from 'react';
import styles from './newCategoryCreator.module.css';
import { createNewCategory } from '@/api/documentService';

function NewCategoryCreator(): React.ReactNode {
  const [isCategoryCreatorOpen, setCategoryCreatorOpen] = useState<boolean>(false);
  const [newNameCategory, setNewNameCategory] = useState<string>('');
  const newCategoryInput = useRef<HTMLInputElement | null>(null);

  const toggleCategoryCreator = () => {
    setCategoryCreatorOpen(!isCategoryCreatorOpen);
    isCategoryCreatorOpen && setNewNameCategory('');
  };

  useEffect(() => {
    isCategoryCreatorOpen && newCategoryInput.current?.focus();
  }, [isCategoryCreatorOpen]);

  const handleChangeNewNameValue = (event: ChangeEvent<HTMLInputElement>) => {
    setNewNameCategory(event.target.value);
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (await createNewCategory(newNameCategory)) {
      console.log(newNameCategory); /// Добавление новой категории в стейт приложения
      toggleCategoryCreator();
    }
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
          <div className={styles.categoryCreator_buttonsContainer}>
            <button
              className={[styles.categoryCreator_button, styles.categoryCreator_submitButton].join(' ')}
              onClick={toggleCategoryCreator}
              type='button'
              title='Отмена'
            >
              Отмена
            </button>
            <button
              className={[styles.categoryCreator_button, styles.categoryCreator_submitButton].join(' ')}
              type='submit'
              title='Создать'
              disabled={!newNameCategory}
            >
              Создать
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default NewCategoryCreator;

import { ChangeEvent, useEffect, useRef, useState } from 'react';
import styles from './newCategoryCreator.module.css';
import { createNewCategory } from '@/api/documentService';
import { IResourceMetadata } from '@/interfaces/IResourceMetadata';

interface INewCategoryCreatorProps {
  categoryList: IResourceMetadata[];
  setCategoryList: React.Dispatch<React.SetStateAction<IResourceMetadata[]>>;
}

function NewCategoryCreator({categoryList, setCategoryList}: INewCategoryCreatorProps): React.ReactElement {
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
      setCategoryList([...categoryList, {name: newNameCategory}]); /// Здесь должен быть запрос на сервер за данными новой категории и пуш их в стейт categoryList
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
          <span>Создать новую категорию</span>
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

import { ChangeEvent, useEffect, useRef, useState } from 'react';
import styles from './newCategoryCreator.module.css';
import { createNewCategory } from '@/api/documentService';
import { IResourceMetadata } from '@/interfaces/IResourceMetadata';
import { useTranslation } from 'react-i18next';
import { Localization } from '@/enums/Localization';
import { observer } from 'mobx-react-lite';

interface INewCategoryCreatorProps {
  addNewCategory: (newCategory: IResourceMetadata) => void;
}

const NewCategoryCreator: React.FC<INewCategoryCreatorProps> = observer(({ addNewCategory }) => {
  const [isCategoryCreatorOpen, setCategoryCreatorOpen] = useState<boolean>(false);
  const [newNameCategory, setNewNameCategory] = useState<string>('');
  const { t } = useTranslation();
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
      addNewCategory({ name: newNameCategory, path: `disk:/CaseLabDocuments/${newNameCategory}` });
      toggleCategoryCreator();
    }
  };

  return (
    <div className={styles.categoryCreator}>
      {!isCategoryCreatorOpen ? (
        <button
          className={[styles.categoryCreator_button, styles.categoryCreator_openButton].join(' ')}
          type='button'
          title={t(Localization.CREATE_CATEGORY)}
          onClick={toggleCategoryCreator}
        >
          <div className={styles.categoryCreator_openButton_icon}></div>
          <span>{t(Localization.CREATE_CATEGORY)}</span>
        </button>
      ) : (
        <form onSubmit={handleFormSubmit} className={styles.categoryCreator_form}>
          <input
            ref={newCategoryInput}
            className={styles.categoryCreator_input}
            type='text'
            placeholder={t(Localization.CATEGORY_NAME)}
            value={newNameCategory}
            onChange={handleChangeNewNameValue}
          />
          <div className={styles.categoryCreator_buttonsContainer}>
            <button
              className={[styles.categoryCreator_button, styles.categoryCreator_submitButton].join(
                ' '
              )}
              onClick={toggleCategoryCreator}
              type='button'
              title={t(Localization.CANCEL)}
            >
              {t(Localization.CANCEL)}
            </button>
            <button
              className={[styles.categoryCreator_button, styles.categoryCreator_submitButton].join(
                ' '
              )}
              type='submit'
              title={t(Localization.CREATE)}
              disabled={!newNameCategory}
            >
              {t(Localization.CREATE)}
            </button>
          </div>
        </form>
      )}
    </div>
  );
});

export default NewCategoryCreator;

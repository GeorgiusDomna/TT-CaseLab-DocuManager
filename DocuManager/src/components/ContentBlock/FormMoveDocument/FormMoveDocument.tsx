import { ChangeEvent, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Localization } from '@/enums/Localization';
import Button from '../Button/Button';
import styles from './formmovedocument.module.css';
import { moveDocument } from '@/api/documentService.ts';
import categoryStore from '@/stores/CategoryStore';
import { observer } from 'mobx-react-lite';

interface FormMoveDocumentProps {
  selectValue: string;
  name: string;
  path: string;
  id: string;
  deleteDocument: (resource_id: string) => void;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const FormMoveDocument: React.FC<FormMoveDocumentProps> = observer(
  ({ selectValue, name, path, id, deleteDocument, onChange }) => {
    const { categoryList } = categoryStore;

    const handleMoveDocument = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      moveFile(selectValue, path);
    };

    const moveFile = async (selectValue: string, path: string, overwrite: boolean = false) => {
      const splitedPath = path.split('/');
      const newPath = Array.from(splitedPath, (element, index) =>
        index === splitedPath.length - 2 ? selectValue : element
      ).join('/');
      const result = await moveDocument(newPath, path, overwrite);

      if (typeof result !== 'boolean' && result?.status === 201) {
        deleteDocument(id);
      }
      if (typeof result !== 'boolean' && result?.status === 409) {
        const overwriteConfirm: boolean = confirm(t(Localization.FILE_EXIST));
        if (overwriteConfirm) await moveFile(selectValue, path, overwriteConfirm);
      }
    };

    const { t } = useTranslation();

    return (
      <form className={styles.document__form} name={name} onSubmit={handleMoveDocument}>
        <select
          className={styles.document__select}
          name='select-change-document'
          onChange={onChange}
          defaultValue=''
        >
          <option className={styles.document__option} disabled value=''>
            {t(Localization.CHOOSE_CATEGORY)}
          </option>
          {categoryList.map(
            (item) =>
              item.name !== path.split('/')[2] && (
                <option key={item.name} value={item.name}>
                  {item.name}
                </option>
              )
          )}
        </select>
        <Button text={t(Localization.MOVE)} type='submit' disabled={!selectValue} />
      </form>
    );
  }
);

export default FormMoveDocument;

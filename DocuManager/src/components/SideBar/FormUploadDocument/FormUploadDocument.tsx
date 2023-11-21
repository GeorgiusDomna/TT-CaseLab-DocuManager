import { ChangeEvent, KeyboardEvent, FormEvent, useState } from 'react';
import styles from './formuploaddocument.module.css';
import { IResourceMetadata } from '@/interfaces/IResourceMetadata';
import { useTranslation } from 'react-i18next';
import { Localization } from '@/enums/Localization';
import { createFile, createURLFile, getFileInfo } from '@/api/documentService';
import { observer } from 'mobx-react-lite';
import alertStore from '@/stores/AlertStore';
import DocumentStore from '@/stores/DocumentStore';

interface IFormUploadDocumentProps {
  categoryList: IResourceMetadata[];
}

const FormUploadDocument: React.FC<IFormUploadDocumentProps> = observer(({ categoryList }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectValue, setSelectValue] = useState<string>('');
  const [fileValue, setFileValue] = useState<File | null>(null);
  const [nameValue, setNameValue] = useState<string>('');
  const [previewImage, setPreviewImage] = useState<string>('');
  const [previewText, setPreviewText] = useState<string>('');

  const resetStates = () => {
    setFileValue(null);
    setPreviewImage('');
    setPreviewText('');
    setSelectValue('');
    setNameValue('');
  };

  const toggleFormUploadDocument = () => {
    setIsOpen(!isOpen);
    !isOpen && resetStates();
  };

  const handleChangeSelectValue = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(event.target.value);
  };

  const handleChangeFileValue = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      setPreviewText(file.name);
      setFileValue(file);
      reader.onload = function handleFileLoad() {
        const base64Data: string | ArrayBuffer | null = reader.result;
        if (base64Data) {
          setPreviewImage(base64Data.toString());
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const regex = /^[a-zA-Z0-9]+$/;
    const isValid = regex.test(event.key);

    if (!isValid) {
      event.preventDefault();
    }
  };

  const handleChangeNameValue = (event: ChangeEvent<HTMLInputElement>) => {
    setNameValue(event.target.value.trim());
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const fileExtension = previewText.split('.').pop();
    const name = nameValue ? `${nameValue}.${fileExtension}` : previewText;
    createURLFile(`${selectValue}/${name}`)
      .then((res) => {
        fileValue &&
          res &&
          createFile(res.href, fileValue)
            .then((isCreated) => {
              if (isCreated) {
                form.reset();
                resetStates();
                setIsOpen(false);
                getFileInfo(`disk:${selectValue}/${name}`)
                  .then((newItem) => newItem && DocumentStore.addDocument(newItem))
                  .catch((err) => alertStore.toggleAlert(err));
              }
            })
            .catch((err) => alertStore.toggleAlert(err));
      })
      .catch((err) => alertStore.toggleAlert(err));
  };

  return (
    <div className={styles.documentsUpload_container}>
      {!isOpen ? (
        <button
          className={[styles.documentsUpload_button, styles.documentsUpload_openButton].join(' ')}
          type='button'
          title={t(Localization.UPLOAD_DOCUMENT)}
          onClick={toggleFormUploadDocument}
        >
          <div className={styles.documentsUpload_openButton_icon}></div>
          <span>{t(Localization.UPLOAD_DOCUMENT)}</span>
        </button>
      ) : (
        <form onSubmit={handleFormSubmit} className={styles.documentsUpload_form}>
          {previewImage && (
            <img
              className={styles.documentsUpload_inputFilePreview}
              src={previewImage}
              alt={previewText.split('.')[0]}
            />
          )}
          <label className={styles.documentsUpload_labelFile}>
            <input
              type='file'
              name='file'
              className={styles.documentsUpload_inputFile}
              accept='image/png'
              onChange={handleChangeFileValue}
            />
            <div className={styles.documentsUpload_inputFileBtn} />
            <p className={styles.documentsUpload_inputFileBtnName} title={previewText}>
              {previewText ? previewText : t(Localization.CHOOSE_DOCUMENT)}
            </p>
          </label>
          <label className={styles.documentsUpload_labelText}>
            <input
              className={styles.documentsUpload_inputText}
              name='input-name'
              type='text'
              placeholder={t(Localization.NEW_NAME)}
              value={nameValue}
              onChange={handleChangeNameValue}
              onKeyDown={handleKeyDown}
            />
            <div className={styles.documentsUpload_help} />
            <p className={styles.documentsUpload_helpText}>{t(Localization.NEW_NAME_HELP)}</p>
          </label>
          <select
            className={styles.documentsUpload_select}
            name='select-choose-category'
            onChange={handleChangeSelectValue}
            value={selectValue}
          >
            <option className={styles.document__option} disabled value=''>
              {t(Localization.CHOOSE_CATEGORY)}
            </option>
            {categoryList.map((category) => (
              <option key={category.path} value={category.path.replace('disk:', '')}>
                {category.name}
              </option>
            ))}
          </select>
          <div className={styles.documentsUpload_buttonsContainer}>
            <button
              className={[styles.documentsUpload_button, styles.documentsUpload_submitButton].join(
                ' '
              )}
              onClick={toggleFormUploadDocument}
              type='button'
              title={t(Localization.CANCEL)}
            >
              {t(Localization.CANCEL)}
            </button>
            <button
              className={[styles.documentsUpload_button, styles.documentsUpload_submitButton].join(
                ' '
              )}
              type='submit'
              title={t(Localization.UPLOAD)}
              disabled={!selectValue || !previewImage}
            >
              {t(Localization.UPLOAD)}
            </button>
          </div>
        </form>
      )}
    </div>
  );
});

export default FormUploadDocument;

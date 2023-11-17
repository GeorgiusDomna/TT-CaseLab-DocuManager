import {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Localization} from '@/enums/Localization';
import Button from '../Button/Button';
import styles from './formmovedocument.module.css';
import {IResourceMetadata} from '@/interfaces/IResourceMetadata';
import {fetchFolderContents} from "@/api/documentService.ts";
import {moveDocument} from '../../api/documentService';

interface FormMoveDocumentProps {
    selectValue: string;
    name: string;
    currentCategory: string;
    currentFile: string;
    handlers: unknown;
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const FormMoveDocument: React.FC<FormMoveDocumentProps> = ({
                                                               selectValue,
                                                               name,
                                                               currentCategory,
                                                               currentFile,
                                                               handlers,
                                                               onChange
                                                           }) => {
    const [categoryList, setCategoryList] = useState<IResourceMetadata[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchFolderContents();
            response && setCategoryList(response);
        };
        fetchData();
    }, []);

    const handleMoveDocument = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        MoveFile(currentCategory, selectValue, currentFile)
    };
    // TODO: Сделать нормальный эффект успешности
    // TODO: Сделать обновление списка
    // TODO: Привязать перевод
    const MoveFile = async (currentCategory: string, selectValue: string, currentFile: string, overwrite: boolean = false) => {
        const result = await moveDocument(currentCategory, selectValue, currentFile, overwrite)

        if (result.status === 201) {
            handlers.deleteItem(currentFile)
            alert('Файл успешно перемещён.')
        }
        if (result.status == 409) {
            const overwriteConfirm: boolean = confirm('Файл с таким именем уже существует. Перезаписать?')
            if (overwriteConfirm) await MoveFile(currentCategory, selectValue, currentFile, overwriteConfirm)
        }
    }

    const {t} = useTranslation();

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
                {categoryList.map((item) => (
                    item.name !== currentCategory && <option key={item.name} value={item.name}>{item.name}</option>
                ))}
            </select>
            <Button text={t(Localization.MOVE)} type='submit' disabled={!selectValue}/>
        </form>
    );
};

export default FormMoveDocument;

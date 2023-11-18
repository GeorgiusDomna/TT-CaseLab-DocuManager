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
    path: string;
    currentFile: string;
    handlers: unknown;
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const FormMoveDocument: React.FC<FormMoveDocumentProps> = ({
                                                               selectValue,
                                                               name,
                                                               path,
                                                               currentFile,
                                                               handlers,
                                                               onChange
                                                           }) => {
    const [categoryList, setCategoryList] = useState<IResourceMetadata[]>([]);
    const {t} = useTranslation();
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchFolderContents();
            response && setCategoryList(response);
        };
        fetchData();
    }, []);

    const handleMoveDocument = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        MoveFile(selectValue, currentFile, path)
    };
    // TODO: Сделать нормальный эффект успешности
    const MoveFile = async (selectValue: string, currentFile: string, path: string, overwrite: boolean = false) => {
        const result = await moveDocument(selectValue, currentFile, path, overwrite)

        if (result.status === 201) {
            handlers.deleteItem(currentFile)
            alert(t(Localization.FILE_MOVED))
        }
        if (result.status == 409) {
            const overwriteConfirm: boolean = confirm(t(Localization.FILE_EXIST))
            if (overwriteConfirm) await MoveFile(selectValue, currentFile, path, overwriteConfirm)
        }
    }

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
                    item.name !== path.split('/')[2] && <option key={item.name} value={item.name}>{item.name}</option>
                ))}
            </select>
            <Button text={t(Localization.MOVE)} type='submit' disabled={!selectValue}/>
        </form>
    );
};

export default FormMoveDocument;

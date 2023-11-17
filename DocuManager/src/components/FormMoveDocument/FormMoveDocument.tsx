import {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Localization} from '@/enums/Localization';
import Button from '../Button/Button';
import styles from './formmovedocument.module.css';
import {IResourceMetadata} from '@/interfaces/IResourceMetadata';
import {fetchFolderContents} from "@/api/documentService.ts";

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

    const OAuth_token: string = import.meta.env.VITE_OAUTH_TOKEN;
    const baseUrl = 'https://cloud-api.yandex.net/v1/disk/resources';

    const headers: Headers = new Headers();
    headers.set('Accept', 'application/json');
    headers.set('Content-Type', 'application/json');
    headers.set('Authorization', OAuth_token);

    const MoveFile = async (currentCategory: string, selectValue: string, currentFile: string, overwrite: boolean = false) => {
        let from = `CaseLabDocuments/${currentCategory}/${currentFile}`
        let path = `CaseLabDocuments/${selectValue}/${currentFile}`
        try {
            const response = await fetch(baseUrl + `/move?from=${from}&path=${path}&overwrite=${overwrite}`, {
                method: 'POST',
                headers: headers
            });
            // if (!response.ok) {
            //     throw new Error(`Request failed with status ${response.status}`);
            // }
            // TODO: Сделать нормальный эффект успешности
            // TODO: Сделать обновление списка
            // TODO: Привязать перевод
            switch (response.status) {
                case 201:
                    handlers.deleteItem(currentFile)
                    alert('Файл успешно перемещён.')
                    // const data = await response.json();
                    break;
                case 409:
                    const overwriteConfirm: boolean = confirm('Файл с таким именем уже существует. Перезаписать?')
                    if (overwriteConfirm) await MoveFile(currentCategory, selectValue, currentFile, overwrite = overwriteConfirm)
                    break
                case 413:
                    console.error('Fetch error:', 'Загрузка файла недоступна. Файл слишком большой.');
                    alert('Загрузка файла недоступна. Файл слишком большой.');
                    break;
                case 423:
                    console.error('Fetch error:', 'Технические работы. Сейчас можно только просматривать и скачивать файлы.');
                    alert('Технические работы. Сейчас можно только просматривать и скачивать файлы.');
                    break;
                case 429:
                    console.error('Fetch error:', 'Слишком много запросов.');
                    alert('Слишком много запросов.');
                    break;
                case 503:
                    console.error('Fetch error:', 'Сервис временно недоступен.');
                    alert('Сервис временно недоступен.');
                    break;
                case 507:
                    console.error('Fetch error:', 'Недостаточно свободного места.');
                    alert('Недостаточно свободного места.');
                    break;
            }
            return
        } catch (error) {
            console.error('Fetch error:', error); // TODO ERROR
            throw error;
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

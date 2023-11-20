import { makeObservable, observable, action } from 'mobx';
import documentData from '@/interfaces/documentData';

class DocumentStore {
  /**
   * Массив, содержащий данные всех документов в хранилище.
   */
  documentList: documentData[] = [];

  constructor() {
    makeObservable(this, {
      documentList: observable,
      setDocumentList: action.bound,
      addDocument: action.bound,
      deleteDocument: action.bound,
      renameDocument: action.bound,
    });
  }

  /**
   * Устанавливает список весех документов в хранилище.
   * @param {documentData[]} documentList - Новый список документов для установки.
   */
  setDocumentList(documentList: documentData[]) {
    this.documentList = documentList;
  }

  /**
   * Добавляет новый документ в хранилище документов.
   * @param {documentData} newDocument - Данные нового документа для добавления.
   */
  addDocument(newDocument: documentData) {
    this.documentList.push(newDocument);
  }

  /**
   * Удаляет документ из хранилища на основе его имени.
   * @param {string} resource_id - Id документа, который нужно удалить.
   */
  deleteDocument(resource_id: string) {
    this.documentList = this.documentList.filter((item) => item.resource_id !== resource_id);
  }

  /**
   * Переименовывает документ в хранилище.
   * @param {string} resource_id - Id документа, который нужно переименовать.
   * @param {string} newName - Новое имя для присвоения документу.
   */
  renameDocument(resource_id: string, newName: string) {
    this.documentList = this.documentList.map((el) => {
      if (el.resource_id === resource_id) el.name = newName;
      return el;
    });
  }
}

/**
 * `documentStore`- экземпляр класса `DocumentStore`, предоставляющий интерфейс для управления списком документов.
 * Каждый документ представлен объектом типа `documentData`.
 * Позволяет устанавливать новый список документов, добавлять, удалять и переименовывать документы.
 * Реализован с использованием MobX для управления состоянием.
 *
 * @example
 * // Создание нового хранилища документов
 * const documentStore = new DocumentStore();
 *
 *  * // Установка нового списка документов
 * documentStore.setDocumentList([
 *   { name: 'Doc1', content: 'Text1' },
 *   { name: 'Doc2', content: 'Text2' }
 * ]);
 *
 * // Добавление нового документа
 * documentStore.addDocument({ name: 'Doc3', content: 'Text3' });
 *
 * // Удаление документа по имени
 * documentStore.deleteDocument('Doc1');
 *
 * // Переименование документа
 * documentStore.renameDocument('OldName', 'NewName');
 *
 */
const documentStore = new DocumentStore();

export default documentStore;

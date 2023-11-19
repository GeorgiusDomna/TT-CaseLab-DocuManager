import { makeObservable, observable, action } from 'mobx';
import documentData from '@/interfaces/documentData';

class DocumentStore {
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

  setDocumentList(documentList: documentData[]) {
    this.documentList = documentList;
  }
  addDocument(newDocument: documentData) {
    this.documentList.push(newDocument);
  }
  deleteDocument(name: string) {
    this.documentList = this.documentList.filter((item) => item.name !== name);
  }
  renameDocument(oldName: string, newName: string) {
    this.documentList = this.documentList.map((el) => {
      if (el.name === oldName) el.name = newName;
      return el;
    });
  }
}
const documentStore = new DocumentStore();

export default documentStore;

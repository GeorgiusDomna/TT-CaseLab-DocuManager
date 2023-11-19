import { makeObservable, observable, action } from 'mobx';
import { IResourceMetadata } from '@/interfaces/IResourceMetadata';

class CategoryStore {
  categoryList: IResourceMetadata[] = [];

  constructor() {
    makeObservable(this, {
      categoryList: observable,
      addNewCategory: action.bound,
      setCategoryList: action.bound,
    });
  }

  setCategoryList(categories: IResourceMetadata[]) {
    this.categoryList = categories;
  }

  addNewCategory(newCategory: IResourceMetadata) {
    this.categoryList.push(newCategory);
  }
}
const categoryStore = new CategoryStore();

export default categoryStore;

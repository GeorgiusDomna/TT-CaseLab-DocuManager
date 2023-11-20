import { makeObservable, observable, action } from 'mobx';
import { IResourceMetadata } from '@/interfaces/IResourceMetadata';

class CategoryStore {
  /**
   * Массив, содержащий метаданные категорий. Каждый элемент реализует интерфейс `IResourceMetadata`.
   */
  categoryList: IResourceMetadata[] = [];

  constructor() {
    makeObservable(this, {
      categoryList: observable,
      addNewCategory: action.bound,
      setCategoryList: action.bound,
    });
  }
  /**
   * Устанавливает список всех категорий в хранилище.
   * @param categories - Массив метаданных категорий для установки в качестве нового списка категорий.
   */
  setCategoryList(categories: IResourceMetadata[]) {
    this.categoryList = categories;
  }

  /**
   * Добавляет новую категорию в список категорий.
   * @param newCategory - Новые метаданные категории для добавления в список категорий.
   */
  addNewCategory(newCategory: IResourceMetadata) {
    this.categoryList.push(newCategory);
  }
}

/**
 * `categoryStore`- экземпляр класса `CategoryStore`, предоставляющий интерфейс для управления списком категорий.
 * Каждая категория представлена объектом типа `IResourceMetadata`.
 * Позволяет устанавливать новый список категорий и добавлять новые категории.
 * Реализован с использованием MobX для управления состоянием.
 *
 * @example
 * // Создание нового хранилища категорий
 * const categoryStore = new CategoryStore();
 *
 *  * // Установка нового списка категорий
 * categoryStore.setCategoryList([
 *   { id: 1, name: 'Category1', desc: 'This is Category 1' },
 *   { id: 2, name: 'Category2', desc: 'This is Category 2' },
 * ]);
 *
 * // Добавление новой категории
 * categoryStore.addNewCategory({
 *   id: 3, name: 'Category3',
 *   desc: 'This is Category 3'
 * });
 *
 */
const categoryStore = new CategoryStore();

export default categoryStore;

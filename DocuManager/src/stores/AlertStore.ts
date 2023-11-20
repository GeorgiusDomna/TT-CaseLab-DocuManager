import { makeObservable, observable, action } from 'mobx';

class AlertStore {
  /**
   * Флаг, указывающий, открыт ли алерт.
   *
   * @type {boolean}
   * @memberof AlertStore
   */
  isOpen: boolean = false;
  /**
   * Текстовое сообщение, отображаемое в алерте.
   *
   * @type {string}
   * @memberof AlertStore
   */
  message: string = 'Ошибка!';

  constructor() {
    makeObservable(this, {
      isOpen: observable,
      message: observable,
      toggleAlert: action.bound,
    });
  }

  /**
   * Метод toggleAlert изменяет состояние алерта, открывая или закрывая его.
   * Если передано сообщение, оно устанавливается в алерт, в противном случае
   * устанавливается сообщение по умолчанию.
   *
   * @param {string} [message='Ошибка!'] - Сообщение для отображения в алерте.
   * @memberof AlertStore
   */
  toggleAlert(message: string = 'Ошибка!') {
    this.isOpen = !this.isOpen;
    this.message = this.isOpen ? message : '';
  }
}

const alertStore = new AlertStore();

/**
 * `alertStore` - Хранилище алертов.
 *
 * `alertStore`- Экземпляр класса `AlertStore`, предоставляющий возможность управления состоянием алертов.
 * Содержит флаг `isOpen`, указывающий, открыт ли алерт, и строку `message`, представляющую текстовое сообщение в алерте.
 * Позволяет открывать и закрывать алерт с возможностью установки пользовательского сообщения.
 * Реализован с использованием MobX для управления состоянием.
 *
 * @example
 * // Создание нового хранилища алертов
 * const alertStore = new AlertStore();
 *
 * // Открытие алерта с пользовательским сообщением
 * alertStore.toggleAlert('Новое сообщение');
 *
 * // Закрытие алерта
 * alertStore.toggleAlert();
 */
export default alertStore;

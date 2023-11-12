/**
 * Класс NetworkError представляет собой кастомную ошибку, связанную с отсутствием интернет-соединения.
 * Этот класс расширяет встроенный класс Error.
 *
 * @class NetworkError
 * @extends {Error}
 *
 * @param {string} [message='Нет интернет соединения.'] - Сообщение об ошибке, которое будет передано при создании экземпляра.
 *
 * @example
 * // Пример использования:
 * try {
 *   // Ваш код, который может вызвать ошибку
 *   throw new NetworkError('Ошибка при загрузке данных. Нет интернет соединения.');
 * } catch (error) {
 *   if (error instanceof NetworkError) {
 *     // Обработка сетевой ошибки
 *     console.error('Ошибка сети:', error.message);
 *   } else {
 *     // Обработка других типов ошибок
 *     console.error('Неожиданная ошибка:', error.message);
 *   }
 * }
 */
export class NetworkError extends Error {
  constructor(message: string = 'Нет интернет соединения.') {
    super(message);
    this.name = 'NetworkError';
  }
}

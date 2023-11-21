import alertStore from '@/stores/AlertStore';

/**
 * Проверяет наличие интернет-соединения путем использования свойства `navigator.onLine`.
 *
 * @function isOnline
 * @returns {boolean} - Возвращает `true`, если устройство подключено к интернету, и `false` в противном случае.
 *
 * @example
 * // Пример использования:
 * const onlineStatus = isOnline();
 * if (onlineStatus) {
 *   console.log('Устройство подключено к интернету.');
 * } else {
 *   console.warn('Отсутствует интернет-соединение.');
 * }
 */
export function isOnline() {
  return navigator.onLine;
}
/**
 * Проверяет наличие сетевого подключения перед выполнением операции.
 *
 * Эта функция использует метод `isOnline` для определения того, подключено
 * ли устройство к интернету. Если нет, то отображает предупреждение с помощью
 * метода `alertStore.toggleAlert` и возвращает false. В противном случае
 * возвращает true, указывая на наличие сети.
 *
 * @returns {boolean} - Возвращает true, если устройство подключено к сети,
 *                      в противном случае возвращает false.
 *
 * @example
 * // Пример использования в функции:
 * function выполнитьОперацию() {
 *   if (networkCheck()) {
 *     // Продолжить выполнение операции
 *     // ...
 *   } else {
 *     // Обработать ситуацию отсутствия подключения к интернету
 *     // ...
 *   }
 * }
 */

export function networkCheck() {
  if (!isOnline()) {
    alertStore.toggleAlert('Нет интернет соединения');
    return false;
  } else return true;
}

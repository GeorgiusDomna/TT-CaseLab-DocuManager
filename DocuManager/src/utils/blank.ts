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

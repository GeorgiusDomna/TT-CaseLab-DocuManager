import { IFailedServerResponse } from '@/interfaces/IFailedServerResponse';
import { NetworkError } from '../errors/NetworkError';
import { ResourceMetadata } from '../interfaces/blank';
import { isOnline } from '../utils/blank';

const OAuth_token: string = import.meta.env.VITE_OAUTH_TOKEN;
const url = 'https://cloud-api.yandex.net/v1/disk/resources';

const headers: Headers = new Headers();
headers.set('Accept', 'application/json');
headers.set('Content-Type', 'application/json');
headers.set('Authorization', OAuth_token);

export async function getFilesFromDir(category: string) {
  try {
    const response = await fetch(url + '?path=disk:/CaseLabDocuments/' + category, {
      method: 'GET',
      headers: headers,
    });
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    const data = await response.json();
    return data._embedded.items;
  } catch (error) {
    console.error('Fetch error:', error); // Здесь будет кастомный алерт
    throw error;
  }
}

export async function getAllFiles() {
  try {
    const response = await fetch(url + '/files', {
      method: 'GET',
      headers: headers,
    });
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    const data = await response.json();
    return data.items;
  } catch (error) {
    console.error('Fetch error:', error); // Здесь будет кастомный алерт
    throw error;
  }
}

export async function fetchFolderContents() {
  if (!isOnline()) throw new NetworkError();

  const url: string = 'https://cloud-api.yandex.net/v1/disk/resources?path=/CaseLabDocuments';
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers,
    });
    if (!response.ok) throw new Error(`Ошибка: ${response.status}`);
    const data = (await response.json()) as { _embedded: { items: ResourceMetadata[] } };
    const contents = data._embedded.items;
    return contents;
  } catch (error) {
    console.error('Ошибка при получении содержимого папки "CaseLab":', error); // Здесь будет кастомный алерт
  }
}
/**
 * Асинхронная функция для создания новой категории.
 *
 * @param {string} nameCategory - Название для создаваемой категории.
 * @returns {Promise<boolean | undefined>}
 * - Promise, разрешается значением `true` в случае успешного создания категории.
 * - В противном случае промис разрешается значением `undefined`.
 * @throws {NetworkError}
 * - Выбрасывается в случае неудачного ответа от сервера.
 * - Также если отсутствует подключение к сети.
 *
 * @example
 * // Пример использования:
 * try {
 *   const success = await createNewCategory("НоваяКатегория");
 *   if (success) {
 *     console.log("Категория успешно создана");
 *   } else {
 *     console.log("Произошла ошибка при создании категории");
 *   }
 * } catch (error) {
 *   console.error("Ошибка:", error.message);
 * }
 */
export async function createNewCategory(nameCategory: string): Promise<boolean | undefined> {
  try {
    if (!isOnline()) throw new NetworkError();
    const URL: string = `${url}?path=CaseLabDocuments%2F${nameCategory}`;
    const response = await fetch(URL, {
      method: 'PUT',
      headers,
    });
    if (!response.ok) {
      const error: IFailedServerResponse = await response.json();
      throw new Error(`Ошибка ${response.status}: ${error.message}`);
    }
    return true;
  } catch (error) {
    console.error(error.message); // Здесь будет кастомный алерт
  }
}

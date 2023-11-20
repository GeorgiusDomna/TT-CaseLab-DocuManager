import { IFailedServerResponse } from '@/interfaces/IFailedServerResponse';
import { NetworkError } from '@/errors/NetworkError';
import { IResourceMetadata } from '@/interfaces/IResourceMetadata';
import { isOnline } from '@/utils/blank';
import alertStore from '@/stores/AlertStore';

const OAuth_token: string = import.meta.env.VITE_OAUTH_TOKEN;
const baseUrl = 'https://cloud-api.yandex.net/v1/disk/resources';

const headers: Headers = new Headers();
headers.set('Accept', 'application/json');
headers.set('Content-Type', 'application/json');
headers.set('Authorization', OAuth_token);

export async function getFilesFromDir(category: string) {
  try {
    if (!isOnline()) throw new NetworkError();
    const response = await fetch(baseUrl + '?path=disk:/CaseLabDocuments/' + category, {
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

export async function getFilesFromBasket() {
  try {
    if (!isOnline()) throw new NetworkError();
    const response = await fetch(baseUrl.replace('resources', 'trash') + '/resources?path=%2F', {
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
    if (!isOnline()) throw new NetworkError();
    const response = await fetch(baseUrl + '/files', {
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
  try {
    if (!isOnline()) throw new NetworkError();
    const url: string = `${baseUrl}?path=/CaseLabDocuments`;
    const response = await fetch(url, {
      method: 'GET',
      headers,
    });
    if (!response.ok) throw new Error(`Ошибка: ${response.status}`);
    const data = (await response.json()) as { _embedded: { items: IResourceMetadata[] } };
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
    const URL: string = `${baseUrl}?path=CaseLabDocuments%2F${nameCategory}`;
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

export async function createURLFile(path: string) {
  try {
    if (!isOnline()) throw new NetworkError();
    const URL: string = `${baseUrl}/upload/?path=${path}`;
    const response = await fetch(URL, {
      method: 'GET',
      headers,
    });
    if (!response.ok) {
      const error: IFailedServerResponse = await response.json();
      if (response.status === 409) {
        return Promise.reject(
          `${error.message} Проверьте выбранную категорию. Переименуйте документ или загрузите другой.`
        );
      }
    }
    return response.json();
  } catch (error) {
    console.error(error);
  }
}

export async function createFile(url: string, file: File) {
  try {
    if (!isOnline()) throw new NetworkError();
    const URL: string = url;
    const response = await fetch(URL, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: file,
    });
    if (!response.ok) {
      const error: IFailedServerResponse = await response.json();
      throw new Error(`Ошибка ${response.status}: ${error.message}`);
    }
    return response;
  } catch (error) {
    console.error(error);
  }
}
export async function deleteDocumentOnServer(path: string): Promise<boolean | undefined> {
  let url: string;
  try {
    if (!isOnline()) throw new NetworkError();
    // Формируем URL для удаления файла
    if (path.includes('trash:/')) 
        url = baseUrl.replace('resources', 'trash') + '/resources?path=' + path;
    else
      url = `${baseUrl}?path=${path}`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers,
    });
    if (!response.ok) throw new Error(`Ошибка: ${response.status}`);
    return true;
  } catch (error) {
    alertStore.toggleAlert(error.message);
  }
}
export async function moveDocument(
  path: string,
  from: string,
  overwrite: boolean = false
): Promise<{ status: number } | boolean | undefined> {
  try {
    if (!isOnline()) throw new NetworkError();

    const URL: string = `${baseUrl}/move?from=${from}&path=${path}&overwrite=${overwrite}`;
    const response = await fetch(URL, {
      method: 'POST',
      headers,
    });
    if (response.status === 409) {
      return {
        status: response.status,
      };
    }
    if (!response.ok) {
      const error: IFailedServerResponse = await response.json();
      throw new Error(`Ошибка ${response.status}: ${error.message}`);
    }
    return { status: response.status };
  } catch (error) {
    alertStore.toggleAlert(error.message);
  }
}

export async function RecoveryDocumentOnServer(path: string): Promise<boolean | undefined> {
  try {
    if (!isOnline()) throw new NetworkError();
    // Формируем URL для востановления файла 
    const url: string = baseUrl.replace('resources', 'trash') + '/resources/restore?path=' + path;
    const response = await fetch(url, {
      method: 'PUT',
      headers,
    });
    if (!response.ok) throw new Error(`Ошибка: ${response.status}`);
    return true;
  } catch (error) {
    alertStore.toggleAlert(error.message);
  }
}
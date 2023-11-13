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
    console.error('Fetch error:', error); // TODO ERROR
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
    console.error('Fetch error:', error); // TODO ERROR
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

  } catch (error: any) {
    console.error('Ошибка при получении содержимого папки "CaseLab":', error.message);
  }
}

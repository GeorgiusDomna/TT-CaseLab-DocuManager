import { NetworkError } from '../errors/NetworkError';
import { ResourceMetadata } from '../interfaces/blank';
import { isOnline } from '../utils/blank';

const OAuth_token: string = import.meta.env.VITE_OAUTH_TOKEN;

const headers: Headers = new Headers();
headers.set('Accept', 'application/json');
headers.set('Content-Type', 'application/json');
headers.set('Authorization', OAuth_token);

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
    console.error('Ошибка при получении содержимого папки "CaseLab":', error.message);
  }
}

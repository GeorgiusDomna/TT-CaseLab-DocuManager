import { HeadersObject } from '../interfaces/blank';

const OAuth_token: string = import.meta.env.VITE_OAUTH_TOKEN;
const url = 'https://cloud-api.yandex.net/v1/disk/resources';

// const headers: HeadersObject = new Headers({
//   Accept: 'application/json',
//   'Content-Type': 'application/json',
//   Authorization: OAuth_token,
// });

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

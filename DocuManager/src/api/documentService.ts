import { HeadersObject } from '../interfaces/blank';

const OAuth_token: string = import.meta.env.VITE_OAUTH_TOKEN;

const headers: HeadersObject = new Headers({
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: OAuth_token,
});

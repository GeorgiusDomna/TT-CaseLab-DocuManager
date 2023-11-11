export interface HeadersObject extends Record<string, string> {
  Accept: string;
  'Content-Type': string;
  Authorization: string;
}
export interface FileOrFolder {
  name: string;
  type: 'file' | 'dir';
  size: number;
  created: string;
}

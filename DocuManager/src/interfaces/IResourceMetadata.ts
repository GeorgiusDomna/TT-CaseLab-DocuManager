export interface IResourceMetadata {
  comment_ids?: {
    private_resource: string;
    public_resource: string;
  };
  created?: string;
  exif?: Record<string, unknown>;
  modified?: string;
  name: string;
  path: string;
  resource_id?: string;
  revision?: number;
  type?: string;
}

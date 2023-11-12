export interface ResourceMetadata {
  comment_ids: {
    private_resource: string;
    public_resource: string;
  };
  created: string;
  exif: Record<string, any>;
  modified: string;
  name: string;
  path: string;
  resource_id: string;
  revision: number;
  type: string;
}

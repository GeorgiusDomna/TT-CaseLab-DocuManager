export interface IFailedServerResponse {
  message: string;
  description: string;
  error: string;
  reason?: string;
  limit?: number;
}

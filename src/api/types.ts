import type { ServerError } from './request/error';

export interface ResponseData<Return = null> {
  data: Return | null;
  error: ServerError | null;
}

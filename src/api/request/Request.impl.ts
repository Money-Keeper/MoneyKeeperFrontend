import { Url } from '../../utils/Url';

import type {
  ArgsWithBody,
  BaseArgs,
  RequestArgs,
  Request,
} from './Request.types';
import { Method } from './Request.types';
import { turniki } from './turniki';

class RequestImpl implements Request {
  constructor(private readonly prefix: string) {}

  async get<Return>(params?: BaseArgs) {
    return this.request<Return, {}>(Method.get, params);
  }

  async post<Return, Body>(params: ArgsWithBody<Body>) {
    return this.request<Return, Body>(Method.post, params);
  }

  async put<Return, Body>(params: ArgsWithBody<Body>) {
    return this.request<Return, Body>(Method.put, params);
  }

  async remove<Return>(params?: BaseArgs) {
    return this.request<Return, {}>(Method.delete, params);
  }

  private async request<Return, Body>(
    method: Method,
    params: RequestArgs<Body> = {}
  ) {
    return turniki<Return, Body>({
      ...params,
      url: this.getUrl(params.url),
      method,
    });
  }

  private getUrl(url = ''): string {
    return Url.concatUrl(this.prefix, url);
  }
}

export { RequestImpl };

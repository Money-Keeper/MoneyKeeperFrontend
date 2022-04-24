import type { ServerError } from './error';

export enum Method {
  get = 'GET',
  post = 'POST',
  put = 'PUT',
  delete = 'DELETE',
}

export interface BaseArgs {
  url?: string;
}

export interface BodyArgs<Body> {
  body: Body;
}

export interface ArgsWithBody<Body> extends BaseArgs, BodyArgs<Body> {}

export type RequestArgs<Body> = BaseArgs | ArgsWithBody<Body>;

export type RequestReturnValue<Return> = Promise<
  [Return | null, ServerError | null]
>;

export interface Request {
  get<Return>(params?: BaseArgs): RequestReturnValue<Return>;
  post<Return, Body>(params: ArgsWithBody<Body>): RequestReturnValue<Return>;
  put<Return, Body>(params: ArgsWithBody<Body>): RequestReturnValue<Return>;
  remove<Return>(params?: BaseArgs): RequestReturnValue<Return>;
}

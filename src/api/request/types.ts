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

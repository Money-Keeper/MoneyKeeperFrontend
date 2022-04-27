import type { ServerError } from './error';
import { getUnknownError } from './error';
import type { Method, RequestReturnValue } from './Request.types';

export interface TurnikiArgs<Body> {
  url: string;
  method: Method;
  body?: Body;
}

async function turniki<Return, Body>(
  params: TurnikiArgs<Body>
): RequestReturnValue<Return> {
  try {
    return fetchData(params);
  } catch (e) {
    return [null, getUnknownError()];
  }
}

export { turniki };

async function fetchData<Return, Body>(
  params: TurnikiArgs<Body>
): RequestReturnValue<Return> {
  const { url, method, body } = params;

  const response = await fetch(`http://localhost:3001/api/${url}`, {
    method,
    body: body && JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const [data, error] = await parseResponse<Return>(response);

  if (error) {
    if (!error.errors) {
      return [null, getUnknownError()];
    }

    return [null, error];
  }

  if (!response.ok) {
    return [null, getUnknownError()];
  }

  if (!data) {
    return [null, null];
  }

  return [data, null];
}

async function parseResponse<Return>(
  response: Response
): Promise<[Return | null, ServerError | null]> {
  try {
    const json = await response.json();
    const data = json?.data || json;

    if (data.errors) {
      return [null, data];
    }

    return [data, null];
  } catch (e) {
    return [null, null];
  }
}

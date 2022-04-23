export enum Method {
  get = 'GET',
  post = 'POST',
  put = 'PUT',
  delete = 'Delete',
}

interface TurnikiParams<Body> {
  url: string;
  method?: Method;
  body?: Body;
}

async function turniki<T, Body = {}>(
  params: TurnikiParams<Body>
): Promise<[T | null, any]> {
  const { url, method = Method.get, body } = params;

  try {
    const data = await fetch(`http://localhost:3001/api/${url}`, {
      method,
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(data);
    const json: { data: T } = await data.json();

    return [json.data, null];
  } catch (e) {
    console.log(e);
    return [null, e];
  }
}

export default turniki;

enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

interface Options {
  method?: string
  headers?: Record<string, string>
  data?: unknown
  timeout?: number
}

type HTTPMethod = (url: string, options: Options, timeout?: number) => Promise<unknown>;

const TIMEOUT_DELAY = 5000;
const HOST = 'https://ya-praktikum.tech/api/v2';

function queryStringify(data: Record<string, string>): string {
  if (typeof data !== 'object') {
    throw new Error('Data должна быть объектом');
  }

  const stringify = Object
    .entries(data)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  return `?${stringify}`;
}

export default class Request {
  protected get: HTTPMethod = async (url, options) => {
    const correctUrl = options.data ? `${url}${queryStringify(options.data as Record<string, string>)}` : url;

    return await this.request(
      `${HOST}${correctUrl}`,
      { ...options, method: METHODS.GET },
      options.timeout
    );
  };

  protected post: HTTPMethod = async (url, options) => {
    return await this.request(
      `${HOST}${url}`,
      { ...options, method: METHODS.POST },
      options.timeout
    );
  };

  protected put: HTTPMethod = async (url, options) => {
    return await this.request(
      `${HOST}${url}`,
      { ...options, method: METHODS.PUT },
      options.timeout
    );
  };

  protected delete: HTTPMethod = async (url, options) => {
    return await this.request(
      `${HOST}${url}`,
      { ...options, method: METHODS.DELETE },
      options.timeout
    );
  };

  private readonly request: HTTPMethod = async (url, options, timeout = TIMEOUT_DELAY) => {
    const { headers = {}, method, data } = options;

    const response = await fetch(url, {
      method,
      headers: {
        'Content-type': 'application/json',
        ...headers
      },
      body: JSON.stringify(data),
    });

    return response.json();
  };
}

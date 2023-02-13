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

function queryStringify(data?: Record<string, string>): string {
  if (!data) {
    return '';
  }

  if (typeof data !== 'object') {
    throw new Error('Data должна быть объектом');
  }

  const stringify = Object
    .entries(data)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  return `?${stringify}`;
}

export default class RequestTransport {
  protected get: HTTPMethod = async (url, options) => {
    const correctUrl = `${url}${queryStringify(options.data as Record<string, string>)}`;

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

    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    if (!(data instanceof FormData)) {
      headers['content-type'] = 'application/json';
    }

    const response = await fetch(url, {
      method,
      headers,
      credentials: "include",
      body: JSON.stringify(data),
      signal: controller.signal
    });

    clearTimeout(id);

    const contentType = response.headers.get('content-type');
    const isResponseJson = contentType && contentType.indexOf("application/json") >= 0;

    return isResponseJson ? response.json() : response.text();
  };
}
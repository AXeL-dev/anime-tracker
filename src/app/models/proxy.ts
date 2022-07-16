export interface Proxy {
  name: string;
  url: string;
  headers?: {
    [key: string]: string;
  };
  options?: {
    responseType?: 'text' | 'json';
    responseParser?: (response: any) => string;
    apiKey?: {
      required: boolean;
      hint?: string;
    };
  };
}

export interface Proxy {
  name: string;
  url: string;
  headers?: {
    [key: string]: string;
  };
  options?: {
    apiKey?: {
      required: boolean;
      hint?: string;
    };
  };
}

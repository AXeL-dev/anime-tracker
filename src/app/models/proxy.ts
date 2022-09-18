export interface Proxy {
  name: string;
  url: string;
  params?: {
    [key: string]: string;
  };
  headers?: {
    [key: string]: string;
  };
  options?: {
    responseType?: 'text' | 'json';
    responseParser?: (response: any) => string;
    paramsEncoding?: {
      enabled: boolean;
    };
    apiKey?: {
      required: boolean;
      hint?: string;
    };
  };
}

export interface ExtraProxyData {
  url: string;
}

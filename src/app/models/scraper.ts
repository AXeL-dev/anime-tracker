import { HttpClient } from '@angular/common/http';

export type GetRequestParameters = Parameters<HttpClient['get']>;

export type GetRequestOptions = Omit<
  GetRequestParameters[1],
  'responseType'
> & {
  responseType?: 'text' | 'json';
  timeout?: number;
};

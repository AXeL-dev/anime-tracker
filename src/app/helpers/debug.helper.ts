import { environment } from 'src/environments/environment';

export function debug(message: any, ...params: any) {
  if (!environment.production) {
    console.log(message, ...params);
  }
}

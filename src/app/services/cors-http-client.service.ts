import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CorsHttpClientService {

  private corsProxies = [
    {
      name: 'cors-anywhere',
      url: 'https://cors-anywhere.herokuapp.com/'
    },
    {
      name: 'YaCDN',
      url: 'https://yacdn.org/proxy/'
    },
    {
      name: 'allOrigins',
      url: 'https://api.allorigins.win/raw?url='
    },
  ];

  constructor(private _httpClient: HttpClient) {}

  get(url: string): Promise<any> {
    return this._httpClient.get(`${this.corsProxies[0].url}${url}`, {
      // headers: {
      //   'Content-Type': 'text/html',
      //   'Access-Control-Allow-Origin': '*'
      // },
      responseType: 'text'
    }).toPromise()
    .catch((e: Error) => {
      console.error(e.message);
    });
  }

}

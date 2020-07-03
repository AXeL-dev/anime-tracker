import { BaseCrawler } from './base.crawler';
import { CorsHttpClientService } from '../cors-http-client.service';

export class AnimeKoCrawler extends BaseCrawler {

  constructor(private httpClient: CorsHttpClientService) {
    super('AnimeKo', 'https://animeko.co');
  }

  _getAnimeList(forcedUpdate: boolean = false): Promise<any> {
    return new Promise(async resolve => {
      // ToDo
    });
  }

  _getAnimeInfo(link: string): Promise<any> {
    return new Promise(async resolve => {
      // ToDo
    });
  }

  _getEpisodes(link: string): Promise<any> {
    return new Promise(async resolve => {
      // ToDo
    });
  }

  _getLatestEpisodes(): Promise<any> {
    return new Promise(async resolve => {
      const html = await this.httpClient.get(`${this.baseUrl}/dernieres-sorties`);
      const parser = new DOMParser();
      const dom = parser.parseFromString(html, 'text/html');
      let results = [];
      dom.querySelectorAll('.releases ul li.small-card').forEach((item) => {
        const title = item.querySelector('h2 a');
        const img = item.querySelector('img');
        results.push({
          title: title.innerHTML,
          cover: img.getAttribute('data-src').replace('/small', ''),
          link: title.getAttribute('href')
        });
      });
      resolve(results);
    });
  }
}

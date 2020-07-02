import { BaseCrawler } from './base.crawler';
import * as xray from 'x-ray';

export class AnimeKoCrawler extends BaseCrawler {

  constructor() {
    super('AnimeKo');

    this.retriever = xray({
      filters: {
        rating: (text: string) => {
          return parseInt(text);
        }
      }
    });
  }

  _getAnimeList(forcedUpdate: boolean = false): Promise<any> {
    return new Promise(async resolve => {
      
    });
  }

  _getAnimeInfo(link: string): Promise<any> {
    return new Promise(async resolve => {
      
    });
  }

  _getEpisodes(link: string): Promise<any> {
    return new Promise(async resolve => {
      
    });
  }

  _getLatestEpisodesReleases(link: string): Promise<any> {
    return new Promise(async resolve => {
      
    });
  }
}

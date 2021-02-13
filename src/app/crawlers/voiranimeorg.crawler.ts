import { BaseCrawler } from './abstract/base.crawler';
import { ScraperService } from '../services/scraper.service';
import { Anime } from '../models/anime';
import { Episode } from '../models/episode';
import { Observable, of } from 'rxjs';

export class VoirAnimeOrgCrawler extends BaseCrawler {

  constructor(private scraper: ScraperService) {
    super(
      'VoirAnime.org',
      'https://voiranime.org'
    );
    this.filters = {
      ...this.filters,
      title: (text: string) => {
        const title = text.trim().match(/(.*) (–|épisode) (\d+) (vostfr|vf)$/i);
        return title?.length ? title[1].trim() : text;
      },
      number: (text: string) => {
        const num = text.trim().match(/(\d+) (vostfr|vf)$/i);
        return num?.length ? +num[1] : +text;
      },
      subtitles: (text: string) => {
        const sub = text.trim().match(/(vostfr|vf)$/i);
        return sub?.length ? sub[1] : 'vostfr';
      }
    };
  }

  _getAnimeList(forcedUpdate: boolean = false): Observable<Anime[]> {
    // ToDo
    return of([]);
  }

  _getAnimeInfo(link: string): Observable<Anime> {
    // ToDo
    return of();
  }

  _getEpisodes(link: string): Observable<Episode[]> {
    // ToDo
    return of([]);
  }

  _getLatestEpisodes(): Observable<Episode[]> {
    return this.scraper.scrape(
      `${this.baseUrl}`,
      '#content .video-item',
      {
        anime: {
          title: '.item-head > h3 > a | title',
          cover: '.item-thumbnail img@data-src,src',
        },
        number: '.item-head > h3 > a | number',
        streamLinks: [
          {
            url: '.item-head > h3 > a@href',
            lang: '.item-head > h3 > a | subtitles',
          }
        ],
        //subtitlesLang: '| subtitles',
        releaseDate: '| today', // since we don't have the release date info. let's just return today's date
      },
      this.filters
    );
  }
}

import { LatestEpisodesCrawler } from '../abstract/latest-episodes.crawler';
import { ScraperService } from '../../services/scraper.service';
import { Episode } from '../../models/episode';
import { Observable } from 'rxjs';

export class AnimeFrenzyCrawler extends LatestEpisodesCrawler {

  constructor(private scraper: ScraperService) {
    super(
      'AnimeFrenzy',
      'https://animefrenzy.net'
    );
    this.filters = {
      ...this.filters,
      subtitles: (text: string) => {
        return 'vosten';
      }
    };
  }

  _getLatestEpisodes(): Observable<Episode[]> {
    return this.scraper.scrape(
      `${this.baseUrl}`,
      '#episodes-subbed > .content_episode',
      {
        anime: {
          title: '.iep > .iepcon > .con a.cona',
          cover: '.iep > .ieppic img@src',
        },
        number: '.iep > .iepsbox > a .iepst2 > div | number',
        streamLinks: [
          {
            url: '.iep > .iepsbox > a@href | concatUrl',
            lang: '| subtitles',
          }
        ],
        releaseDate: '.iep > .iepsbox > a .iepst3 time@datetime | number',
      },
      this.filters
    );
  }
}

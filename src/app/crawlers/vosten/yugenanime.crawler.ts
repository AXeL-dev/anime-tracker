import { LatestEpisodesCrawler } from '../abstract/latest-episodes.crawler';
import { ScraperService } from '../../services/scraper.service';
import { Episode } from '../../models/episode';
import { Observable } from 'rxjs';

export class YugenAnimeCrawler extends LatestEpisodesCrawler {

  constructor(private scraper: ScraperService) {
    super(
      'YugenAnime',
      'https://yugenani.me'
    );
    this.filters = {
      ...this.filters,
      cover: (text: string) => {
        const img = text.trim().match(/this\.src='(.*)'$/i);
        return img?.length ? img[1] : text;
      },
      number: (text: string) => {
        const num = text.trim().match(/(\d+) (?:.*)$/i);
        return num?.length ? +num[1] : +text;
      },
      subtitles: (text: string) => {
        return 'vosten';
      }
    };
  }

  _getLatestEpisodes(): Observable<Episode[]> {
    return this.scraper.scrape(
      `${this.baseUrl}/latest`,
      'section ul.ep-grid li.ep-card',
      {
        anime: {
          title: 'a.ep-details .ep-origin-name',
          cover: 'a.ep-thumbnail img@onerror,data-src,src | cover',
        },
        number: 'a.ep-title | number',
        streamLinks: [
          {
            url: 'a.ep-thumbnail@href | concatUrl',
            lang: '| subtitles',
          }
        ],
        releaseDate: 'a.ep-details .ep-statistics time@datetime | date',
      },
      this.filters
    );
  }
}

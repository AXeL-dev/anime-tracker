import { LatestEpisodesCrawler } from './abstract/latest-episodes.crawler';
import { ScraperService } from '../services/scraper.service';
import { Episode } from '../models/episode';
import { Observable } from 'rxjs';

export class DarkAnimeCrawler extends LatestEpisodesCrawler {

  constructor(private scraper: ScraperService) {
    super(
      'DarkAnime',
      'https://darkanime.stream'
    );
    this.filters = {
      ...this.filters,
      number: (text: string) => {
        return +text.replace('E', '');
      },
      subtitles: (text: string) => {
        return 'vosten';
      },
      url: (text: string, element: any) => {
        const number = this.scraper.htmlParser.find(element, 'span.series-content-episode-count | number', this.filters);
        return `${this.filters.concatUrl(text)}/episodes/${number}`;
      }
    };
  }

  _getLatestEpisodes(): Observable<Episode[]> {
    return this.scraper.scrape(
      `${this.baseUrl}/animes/recently-updated`,
      '.series-section .row > div.col-6',
      {
        anime: {
          title: 'h3.series-content-title',
          cover: 'img.series-poster@src',
        },
        number: 'span.series-content-episode-count | number',
        streamLinks: [
          {
            url: 'a.series-card-hyperlink@href | url',
            lang: '| subtitles',
          }
        ],
        //subtitlesLang: '| subtitles',
        releaseDate: '| today', // since we don't have the release date info. let's just return today's date
      },
      this.filters
    );
  }
}

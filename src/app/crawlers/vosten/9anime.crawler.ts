import { LatestEpisodesCrawler } from '../abstract/latest-episodes.crawler';
import { ScraperService } from '../../services/scraper.service';
import { Episode } from '../../models/episode';
import { Observable } from 'rxjs';
import { toNumber } from 'src/app/helpers/number.helper';

export class NineAnimeCrawler extends LatestEpisodesCrawler {
  constructor(private scraper: ScraperService) {
    super('9Anime', 'https://9anime.id', 'vosten');
    this.filters = {
      ...this.filters,
      number: (text: string) => {
        const num = text.match(/Ep (\d+)/i);
        return toNumber(num?.length ? num[1] : text);
      },
      url: (text: string, element: any) => {
        const number = this.scraper.htmlParser.find(
          element,
          'div.meta .ep-status.sub > span | number',
          this.filters
        );
        return `${this.filters.concatUrl(text)}/ep-${number || 1}`;
      },
    };
  }

  _getLatestEpisodes(): Observable<Episode[]> {
    return this.scraper.scrape(
      `${this.baseUrl}/updated`,
      'div#list-items > .item',
      {
        anime: {
          title: 'a.name',
          cover: '.poster img@src',
        },
        number: 'div.meta .ep-status.sub > span | number',
        streamLinks: [
          {
            url: 'a.name@href | url',
            lang: '| subtitles',
          },
        ],
      },
      this.filters
    );
  }
}

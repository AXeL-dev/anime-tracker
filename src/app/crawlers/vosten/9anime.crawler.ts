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
          'div.tag.ep | number',
          this.filters
        );
        return `${this.filters.concatUrl(text)}/ep-${number}`;
      },
    };
  }

  _getLatestEpisodes(): Observable<Episode[]> {
    return this.scraper.scrape(
      encodeURI(
        `${this.baseUrl}/filter?status[]=airing&language[]=subbed&sort=release_date:desc`
      ),
      'ul.anime-list > li',
      {
        anime: {
          title: 'a.name',
          cover: 'a.poster img@src',
        },
        number: 'div.tag.ep | number',
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

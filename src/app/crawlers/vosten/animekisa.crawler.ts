import { LatestEpisodesCrawler } from '../abstract/latest-episodes.crawler';
import { ScraperService } from '../../services/scraper.service';
import { Episode } from '../../models/episode';
import { Observable } from 'rxjs';
import { toNumber } from 'src/app/helpers/number.helper';

export class AnimeKisaCrawler extends LatestEpisodesCrawler {
  constructor(private scraper: ScraperService) {
    super('AnimeKisa', 'https://animekisa.tv', 'vosten');
    this.filters = {
      ...this.filters,
      number: (text: string) => {
        const num = text.match(/Episode (\d+)/);
        return toNumber(num?.length ? num[1] : text);
      },
      date: (text: string) => {
        return +text * 1000; // convert to unix timestamp
      },
    };
  }

  _getLatestEpisodes(): Observable<Episode[]> {
    return this.scraper.scrape(
      `${this.baseUrl}`,
      '.listAnimes > div.episode-box',
      {
        anime: {
          title: '.title-box > div',
          cover: '.image-box img@src,data-cfsrc | concatUrl',
        },
        number: '.info-box > div | number',
        streamLinks: [
          {
            url: '.episode-box-2 a.an:first-child@href | concatUrl',
            lang: '| subtitles',
          },
        ],
        releaseDate: '.info-box > div > time@time | date',
      },
      this.filters
    );
  }
}

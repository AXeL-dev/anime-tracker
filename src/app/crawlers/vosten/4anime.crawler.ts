import { LatestEpisodesCrawler } from '../abstract/latest-episodes.crawler';
import { ScraperService } from '../../services/scraper.service';
import { Episode } from '../../models/episode';
import { Observable } from 'rxjs';
import { toNumber } from 'src/app/helpers/number.helper';

export class FourAnimeCrawler extends LatestEpisodesCrawler {
  constructor(private scraper: ScraperService) {
    super('4Anime', 'https://4anime.to', 'vosten');
    this.filters = {
      ...this.filters,
      cover: (text: string) => {
        if (text?.[0] === '/') {
          return this.filters.concatUrl(text);
        } else {
          return `${text?.replace(/^https?:\/\/49.12.133.151/g, this.baseUrl)}`;
        }
      },
      number: (text: string) => {
        const num = text.match(/\d+/g);
        return toNumber(num?.length ? num[0] : text);
      },
    };
  }

  _getLatestEpisodes(): Observable<Episode[]> {
    return this.scraper.scrape(
      `${this.baseUrl}/recently-added`,
      '#recently-added #headerDIV_2 > div',
      {
        anime: {
          title: 'a#headerA_7@alt',
          cover: 'img#headerIMG_6@src | cover',
        },
        number: 'a#headerA_8 | number',
        streamLinks: [
          {
            url: 'a#headerA_5@href',
            lang: '| subtitles',
          },
        ],
      },
      this.filters
    );
  }
}

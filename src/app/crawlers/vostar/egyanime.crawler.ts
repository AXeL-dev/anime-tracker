import { LatestEpisodesCrawler } from '../abstract/latest-episodes.crawler';
import { ScraperService } from '../../services/scraper.service';
import { Episode } from '../../models/episode';
import { Observable } from 'rxjs';

export class EgyAnimeCrawler extends LatestEpisodesCrawler {

  constructor(private scraper: ScraperService) {
    super(
      'EgyAnime',
      'https://www.egyanime.com'
    );
    this.filters = {
      ...this.filters,
      cover: (text: string) => {
        const url = text.replace(/^\.\./, '');
        return this.filters.concatUrl(url);
      },
      number: (text: string) => {
        const num = text.match(/(.*) (\d+)/);
        return num?.length ? +num[2] : 1;
      },
      subtitles: (text: string) => {
        return 'vostar';
      }
    };
  }

  _getLatestEpisodes(): Observable<Episode[]> {
    return this.scraper.scrape(
      `${this.baseUrl}`,
      'div.column.a-1',
      {
        anime: {
          title: 'a.go-link > div.pin-box > figure.image > span.epi-shadow > p',
          cover: 'a.go-link > div.pin-box > figure.image > img@src | cover',
        },
        number: 'a.go-link > span.tag > p | number',
        streamLinks: [
          {
            url: 'a.go-link@href | concatUrl',
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

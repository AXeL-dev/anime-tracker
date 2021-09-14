import { LatestEpisodesCrawler } from '../abstract/latest-episodes.crawler';
import { ScraperService } from '../../services/scraper.service';
import { Episode } from '../../models/episode';
import { Observable } from 'rxjs';

export class FullAnimeVFCrawler extends LatestEpisodesCrawler {

  constructor(private scraper: ScraperService) {
    super(
      'FullAnimeVF',
      'https://www.fullanimefr.com'
    );
    this.filters = {
      ...this.filters,
      cover: (text: string) => {
        return text.replace('-218x150', '');
      },
      number: (text: string) => {
        const num = text.replace('[NEW]', '').replace('[HD]', '').replace('VOSTFR', '').match(/(.*) Episode (\d+)/);
        return num?.length ? +num[2] : 1;
      },
      isNew: (text: string) => {
        return text.indexOf('[NEW]') !== -1;
      },
      isFinished: (text: string) => {
        return text.indexOf('[FIN]') !== -1;
      },
      title: (text: string) => {
        return text.replace('[NEW]', '').replace('[HD]', '').replace('VOSTFR', '').replace(/(.*) Episode (\d+)/, '$1');
      },
      subtitles: (text: string) => {
        return 'vostfr';
      }
    };
  }

  _getLatestEpisodes(): Observable<Episode[]> {
    return this.scraper.scrape(
      `${this.baseUrl}`,
      'div.td-block-span4',
      {
        anime: {
          title: 'h3.entry-title a | title',
          cover: 'img.entry-thumb@src,data-cfsrc | cover',
          isNew: 'h3.entry-title a | isNew',
          isFinished: 'h3.entry-title a | isFinished',
        },
        number: 'h3.entry-title a | number',
        streamLinks: [
          {
            url: 'h3.entry-title a@href',
            lang: '| subtitles',
          }
        ],
        releaseDate: 'time.entry-date@datetime | date',
      },
      this.filters
    );
  }
}

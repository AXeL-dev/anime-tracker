import { LatestEpisodesCrawler } from '../abstract/latest-episodes.crawler';
import { ScraperService } from '../../services/scraper.service';
import { Episode } from '../../models/episode';
import { Observable } from 'rxjs';

export class ToonAnimeCrawler extends LatestEpisodesCrawler {

  constructor(private scraper: ScraperService) {
    super(
      'ToonAnime',
      'https://wvvw.toonanime.tv'
    );
    this.filters = {
      ...this.filters,
      title: (text: string) => {
        return text.replace(/vostfr/i, '').trim();
      },
      number: (text: string) => {
        const num = text.match(/EP (\d+)/);
        return num?.length ? +num[1] : +text;
      },
      subtitles: (text: string) => {
        return text?.length ? text.toLowerCase().trim() : 'vostfr';
      }
    };
  }

  _getLatestEpisodes(): Observable<Episode[]> {
    return this.scraper.scrape(
      `${this.baseUrl}/anime-vostfr/`,
      '#dle-content > article',
      {
        anime: {
          title: 'footer > div.short__story-title | title',
          cover: 'img@data-src,src | concatUrl',
        },
        number: '.progress__box > div | number',
        streamLinks: [
          {
            url: 'a@href',
            lang: '.label__rate | subtitles',
          }
        ],
        //subtitlesLang: '| subtitles',
        releaseDate: '| today', // since we don't have the release date info. let's just return today's date
      },
      this.filters
    );
  }
}

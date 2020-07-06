import { BaseCrawler } from './base.crawler';
import { ScraperService } from '../services/scraper.service';
import { Episode } from '../models/episode';
import { today, yesterday, frenchDays, frenchMonths } from '../helpers/date.helper';

export class AnimeKoCrawler extends BaseCrawler {

  constructor(private retriever: ScraperService) {
    super(
      'AnimeKo',
      'https://animeko.co'
    );
    this.filters = {
      ...this.filters,
      cover: (text: string) => {
        return text.replace('/small', '');
      },
      subtitles: (text: string) => {
        return 'vostfr';
      },
      date: (text: string) => {
        let date = text;
        if (text.indexOf('Aujourd\'hui') !== -1) {
          date = text.replace('Aujourd\'hui', today(true));
        } else if (text.indexOf('Hier') !== -1) {
          date = text.replace('Hier', yesterday(true));
        } else {
          date = text.replace(new RegExp('^(' + frenchDays.join('|') + ')', 'g'), '');
          date = date.replace(new RegExp('(' + Object.keys(frenchMonths).join('|') + ')', 'g'), month => frenchMonths[month]).trim();
          date = date.split(' ').reverse().join('-');
        }
        return new Date(date).getTime();
      }
    };
  }

  _getAnimeList(forcedUpdate: boolean = false): Promise<any> {
    return new Promise(async resolve => {
      // ToDo
      resolve([]);
    });
  }

  _getAnimeInfo(link: string): Promise<any> {
    return new Promise(async resolve => {
      // ToDo
      resolve([]);
    });
  }

  _getEpisodes(link: string): Promise<any> {
    return new Promise(async resolve => {
      // ToDo
      resolve([]);
    });
  }

  _getLatestEpisodes(): Promise<Episode[]> {
    return new Promise(async resolve => {
      const episodes: Episode[] = await this.retriever.scrape(
        `${this.baseUrl}/dernieres-sorties`,
        '.releases ul li.small-card',
        {
          animeTitle: 'h2 a',
          cover: 'img@data-src | cover',
          number: 'span.badge-number | number' as any,
          streamLinks: [
            {
              url: 'h2 a@href',
              lang: '| subtitles',
            }
          ],
          isNew: '.badge-status.new | boolean' as any,
          isLast: '.badge-status.end | boolean' as any,
          //subtitlesLang: '| subtitles',
          releaseDate: ':prev div .untitle | date',
        } as Episode,
        this.filters
      );
      resolve(episodes);
    });
  }
}

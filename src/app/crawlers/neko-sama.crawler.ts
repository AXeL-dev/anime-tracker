import { BaseCrawler } from './abstract/base.crawler';
import { ScraperService } from '../services/scraper.service';
import { Anime } from '../models/anime';
import { Episode } from '../models/episode';
import { today, yesterday, dateBefore } from '../helpers/date.helper';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

export class NekoSamaCrawler extends BaseCrawler {

  constructor(private scraper: ScraperService) {
    super(
      'Neko-sama',
      'https://www.neko-sama.fr'
    );
    this.filters = {
      ...this.filters,
      number: (text: string) => {
        const num = text.match(/Ep. (\d+)/);
        return num?.length ? +num[1] : +text;
      },
      date: (text: string) => {
        if (text.indexOf('minute') !== -1 || text.indexOf('heure') !== -1) {
          return today();
        } else if (text.indexOf('il y a 1 jour') !== -1) {
          return yesterday();
        } else {
          const matches = text.match(/il y a (\d+) jours/);
          if (matches?.length) {
            return dateBefore(+matches[1]);
          }
          return new Date(text)?.getTime();
        }
      }
    };
  }

  _getAnimeList(forcedUpdate: boolean = false): Observable<Anime[]> {
    // ToDo
    return of([]);
  }

  _getAnimeInfo(link: string): Observable<Anime> {
    // ToDo
    return of();
  }

  _getEpisodes(link: string): Observable<Episode[]> {
    // ToDo
    return of([]);
  }

  _getLatestEpisodes(): Observable<Episode[]> {
    return this.scraper.getRawHTML(this.baseUrl).pipe(map((html: string) => {
      const results = html.match(/lastEpisodes = \[(.*)\]/);
      const latestEpisodes: Episode[] = [];
      if (results?.length) {
        try {
          const episodes = JSON.parse(`[${results[1]}]`);
          episodes.forEach((episode: any) => {
            latestEpisodes.push({
              anime: {
                title: episode.title,
                cover: episode.url_image,
              },
              number: this.filters.number(episode.episode),
              streamLinks: [
                {
                  url: this.filters.concatUrl(episode.url),
                  lang: 'vostfr',
                }
              ],
              //subtitlesLang: 'vostfr',
              releaseDate: this.filters.date(episode.time),
            });
          });
        } catch (error) {
          console.error(error.message);
        }
      }

      return latestEpisodes;
    }));
  }
}

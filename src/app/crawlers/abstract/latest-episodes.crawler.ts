import { BaseCrawler } from './base.crawler';
import { Anime } from '../../models/anime';
import { Episode } from '../../models/episode';
import { Observable, of } from 'rxjs';

export abstract class LatestEpisodesCrawler extends BaseCrawler {
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
}

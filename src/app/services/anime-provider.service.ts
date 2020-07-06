import { Injectable } from '@angular/core';
import { BaseCrawler } from '../crawlers/base.crawler';
import { flatten } from '../helpers/array.helper';
import { ScraperService } from './scraper.service';
import { AnimeKoCrawler } from '../crawlers/animeko.crawler';
import { VostFreeCrawler } from '../crawlers/vostfree.crawler';
import { Anime } from '../models/anime';
import { Episode } from '../models/episode';
import { isSimilar } from '../helpers/string.helper';
import { debug } from '../helpers/debug.helper';
import { Observable, concat, forkJoin } from 'rxjs';
import { map, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AnimeProviderService {

  private crawlers: BaseCrawler[] = [];

  constructor(private scraper: ScraperService) {
    this.addCrawler(new AnimeKoCrawler(this.scraper));
    this.addCrawler(new VostFreeCrawler(this.scraper));
  }

  addCrawler(crawler: BaseCrawler) {
    this.crawlers.push(crawler);
  }

  removeCrawler(crawler: BaseCrawler) {
    this.crawlers = this.crawlers.filter((c: BaseCrawler) => c.name !== crawler.name);
  }

  search(title: string): Observable<Anime[]> {
    return forkJoin(...this.crawlers.map((crawler: BaseCrawler) => crawler.searchAnime(title))).pipe(
      map((animes: Anime[]) => {
        return flatten(animes);
      })
    );
  }

  getLatestEpisodes(): Observable<Episode[]> {
    let latestEpisodes: Episode[] = [];
    return concat(...this.crawlers.map((crawler: BaseCrawler) => crawler.getLatestEpisodes())).pipe(
      delay(700), // delay used to wait for UI renders
      map((episodes: Episode[], index: number) => {
        debug(`${this.crawlers[index].name} latest episodes:`);
        debug(episodes);
        debug('--------------------------');
        // filter duplicates
        episodes.forEach((episode: Episode) => {
          let isDuplicated = false;
          latestEpisodes.forEach((lastestEpisode: Episode, index: number) => {
            // duplicated
            if (isSimilar(lastestEpisode.animeTitle, episode.animeTitle) && lastestEpisode.number === episode.number) {
              if (!latestEpisodes[index].releaseDate) {
                latestEpisodes[index].releaseDate = episode.releaseDate;
              }
              latestEpisodes[index].streamLinks = [...latestEpisodes[index].streamLinks, ...episode.streamLinks]; // array.push(...episode.streamLinks) not working well here
              if (episode.downloadLinks?.length) {
                latestEpisodes[index].downloadLinks = [...latestEpisodes[index].downloadLinks, ...episode.downloadLinks];
              }
              if (episode.isNew && !latestEpisodes[index].isNew) {
                latestEpisodes[index].isNew = episode.isNew;
              }
              if (episode.isLast && !latestEpisodes[index].isLast) {
                latestEpisodes[index].isLast = episode.isLast;
              }
              isDuplicated = true;
              return;
            }
          });
          // not duplicated
          if (!isDuplicated) {
            latestEpisodes.push({
              ...episode,
              downloadLinks: episode.downloadLinks?.length ? episode.downloadLinks : []
            });
          }
        });
        // sort
        if (latestEpisodes.length) {
          latestEpisodes = latestEpisodes.sort((a: Episode, b: Episode) => (b.releaseDate as number) - (a.releaseDate as number));
        }

        return latestEpisodes;
      }
    ));
  }

}

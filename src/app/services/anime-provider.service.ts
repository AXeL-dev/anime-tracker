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
import { Observable, concat, forkJoin, timer } from 'rxjs';
import { map, delay, concatMap, takeWhile } from 'rxjs/operators';
import { dateOnly } from '../helpers/date.helper';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root',
})
export class AnimeProviderService {

  private crawlers: BaseCrawler[] = [];

  constructor(private scraper: ScraperService, private settings: SettingsService) {
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

  getLatestEpisodes(): Observable<[Episode[], number[]]> {
    let latestEpisodes: Episode[] = [];
    let slicedEpisodesCount: number = 0;
    const maxEpisodesPerSlice: number = 5;
    return concat(...this.crawlers.map((crawler: BaseCrawler) => crawler.getLatestEpisodes())).pipe(
      //delay(700), // delay used to wait for UI renders
      concatMap((episodes: Episode[], index: number) => {
        debug(`${this.crawlers[index].name} latest episodes:`);
        debug(episodes);
        debug('--------------------------');
        // filter duplicates
        episodes.forEach((episode: Episode) => {
          let isDuplicated = false;
          latestEpisodes.forEach((lastestEpisode: Episode, index: number) => {
            // duplicated
            if (isSimilar(lastestEpisode.anime.title, episode.anime.title) && lastestEpisode.number === episode.number) {
              if (!latestEpisodes[index].releaseDate) {
                latestEpisodes[index].releaseDate = episode.releaseDate;
              }
              latestEpisodes[index].streamLinks = [...latestEpisodes[index].streamLinks, ...episode.streamLinks]; // array.push(...episode.streamLinks) not working well here
              if (episode.downloadLinks?.length) {
                latestEpisodes[index].downloadLinks = [...latestEpisodes[index].downloadLinks, ...episode.downloadLinks];
              }
              if (episode.anime.isNew && !latestEpisodes[index].anime.isNew) {
                latestEpisodes[index].anime.isNew = episode.anime.isNew;
              }
              if (episode.anime.isFinished && !latestEpisodes[index].anime.isFinished) {
                latestEpisodes[index].anime.isFinished = episode.anime.isFinished;
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
            } as Episode);
          }
        });
        // sort
        if (latestEpisodes.length) {
          latestEpisodes = latestEpisodes.sort((a: Episode, b: Episode) => (b.releaseDate as number) - (a.releaseDate as number));
        }
        // return as slices (to avoid freezing the UI)
        let continueSlicing: boolean = true;
        return timer(700, 1000).pipe( // starts after 700 ms & reloop each 1000 ms
          takeWhile(() => continueSlicing),
          map((i: number) => {
            let from = i * maxEpisodesPerSlice;
            let to = from + slicedEpisodesCount + maxEpisodesPerSlice;
            if (to >= latestEpisodes.length) {
              to = latestEpisodes.length;
              slicedEpisodesCount = to;
              continueSlicing = false;
            }
            const episodesSlice = latestEpisodes.slice(/*from*/0, to);
            const days = this.settings.displayEpisodesDayByDay ? this.getEpisodesDays(latestEpisodes.slice(0, to)) : [];
            debug('Slice', i, ':', episodesSlice);
            debug('Days:', days);
            debug('----------------------------');
            return [episodesSlice, days];
          })
        );
      }
    )) as Observable<[Episode[], number[]]>;
  }

  private getEpisodesDays(episodes: Episode[]): number[] {
    let days: number[] = [];
    episodes.forEach((episode: Episode) => {
      if (episode.releaseDate) {
        const day = dateOnly(new Date(episode.releaseDate));
        if (days.indexOf(day) === -1) {
          days.push(day);
        }
      }
    });
    return days;
  }

}

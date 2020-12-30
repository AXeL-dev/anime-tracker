import { Injectable } from '@angular/core';
import { BaseCrawler } from '../crawlers/abstract/base.crawler';
import { flatten } from '../helpers/array.helper';
import { CrawlersService } from './crawlers.service';
import { Anime } from '../models/anime';
import { Episode } from '../models/episode';
import { isSimilar } from '../helpers/string.helper';
import { Observable, concat, forkJoin, timer, of } from 'rxjs';
import { map, delay, concatMap, takeWhile } from 'rxjs/operators';
import { dateOnly } from '../helpers/date.helper';
import { SettingsService } from './settings.service';
import { DebugService } from './debug.service';

@Injectable({
  providedIn: 'root',
})
export class AnimeProviderService {

  constructor(
    private crawlers: CrawlersService,
    private settings: SettingsService,
    private debug: DebugService
  ) { }

  search(title: string): Observable<Anime[]> {
    return forkJoin(...this.crawlers.getActive().map((crawler: BaseCrawler) => crawler.searchAnime(title))).pipe(
      map((animes: Anime[]) => {
        return flatten(animes);
      })
    );
  }

  getLatestEpisodes(forcedUpdate: boolean = false, asSlices: boolean = true, maxEpisodesPerSlice: number = 50): Observable<[Episode[], number[]]> {
    if (!maxEpisodesPerSlice) {
      maxEpisodesPerSlice = this.settings.maxEpisodesToRetrieve;
    }
    let latestEpisodes: Episode[] = [];
    let slicedEpisodesCount: number = 0;
    const crawlers = this.crawlers.getActive();
    const mergeEpisodes = (allEpisodes: Episode[], index: number) => {
      let episodes: Episode[] = [];
      if (asSlices) {
        episodes = allEpisodes.slice(0, Math.min(allEpisodes.length, this.settings.maxEpisodesToRetrieve));
      } else {
        episodes = flatten(
          allEpisodes.map((episodesArray: any) => episodesArray.slice(0, Math.min(episodesArray.length, this.settings.maxEpisodesToRetrieve)))
        );
      }
      this.debug.log(asSlices ? `${crawlers[index].name} latest episodes:` : 'Latest episodes:');
      this.debug.log(episodes);
      this.debug.log('--------------------------');
      // filter duplicates
      episodes.forEach((episode: Episode) => {
        let index: number = 0;
        for (let lastestEpisode of latestEpisodes) {
          // duplicated
          if (isSimilar(lastestEpisode.anime.title, episode.anime.title) && lastestEpisode.number === episode.number) {
            if (!latestEpisodes[index].releaseDate) {
              latestEpisodes[index].releaseDate = episode.releaseDate;
            }
            if (episode.streamLinks?.length) {
              latestEpisodes[index].streamLinks = [...latestEpisodes[index].streamLinks, ...episode.streamLinks]; // do not use array.push(...), it duplicates existing links
            }
            if (episode.downloadLinks?.length) {
              latestEpisodes[index].downloadLinks = [...latestEpisodes[index].downloadLinks, ...episode.downloadLinks];
            }
            if (episode.anime.isNew && !latestEpisodes[index].anime.isNew) {
              latestEpisodes[index].anime.isNew = episode.anime.isNew;
            }
            if (episode.anime.isFinished && !latestEpisodes[index].anime.isFinished) {
              latestEpisodes[index].anime.isFinished = episode.anime.isFinished;
            }
            return; // ends the current foreach iteration function, so the code below will not be executed
          }
          index++;
        }
        // not duplicated
        latestEpisodes.push({
          ...episode,
          streamLinks: episode.streamLinks || [],
          downloadLinks: episode.downloadLinks || []
        } as Episode);
      });
      // sort
      if (latestEpisodes.length) {
        latestEpisodes = latestEpisodes.sort((a: Episode, b: Episode) => (b.releaseDate as number) - (a.releaseDate as number));
      }
      // return as slices (to avoid freezing the UI)
      let continueSlicing: boolean = true;
      return asSlices ? timer(100, 500).pipe( // starts after 100 ms & reloop each 500 ms
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
          const days = this.settings.displayEpisodesDayByDay ? this.getEpisodesDays(episodesSlice) : [];
          this.debug.log('Slice', i, ':', episodesSlice);
          this.debug.log('Days:', days);
          this.debug.log('----------------------------');
          return [episodesSlice, days];
        })
      ) : of([latestEpisodes, this.getEpisodesDays(latestEpisodes)]);
    };
    const observable = asSlices ? concat : forkJoin;

    return observable(...crawlers.map((crawler: BaseCrawler) => crawler.getLatestEpisodes(forcedUpdate))).pipe(
      //delay(700), // delay used to wait for UI renders
      concatMap(mergeEpisodes)
    ) as Observable<[Episode[], number[]]>;
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

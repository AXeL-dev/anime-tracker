import { Injectable } from '@angular/core';
import { BaseCrawler } from '../crawlers/abstract/base.crawler';
import { flatten } from '../helpers/array.helper';
import { CrawlersService } from './crawlers.service';
import { Anime } from '../models/anime';
import { Episode, EpisodeSortingCriteria } from '../models/episode';
import { isSimilar } from '../helpers/string.helper';
import { Observable, concat, forkJoin, timer } from 'rxjs';
import { map, concatMap, takeWhile } from 'rxjs/operators';
import { dateOnly, sameDates } from '../helpers/date.helper';
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
  ) {}

  search(title: string): Observable<Anime[]> {
    const crawlers = this.crawlers.getActive();

    return forkJoin(
      crawlers.map((crawler: BaseCrawler) => crawler.searchAnime(title))
    ).pipe(
      map((animes: Anime[][]) => {
        return flatten(animes);
      })
    );
  }

  getLatestEpisodes(forcedUpdate: boolean = false): Observable<Episode[]> {
    const crawlers = this.crawlers.getActive(forcedUpdate);

    return forkJoin(
      crawlers.map((crawler: BaseCrawler) =>
        crawler.getLatestEpisodes(forcedUpdate)
      )
    ).pipe(
      map((episodes: Episode[][]) => {
        const allEpisodes = flatten(
          episodes.map((episodesArray: Episode[]) =>
            episodesArray.slice(
              0,
              Math.min(
                episodesArray.length,
                this.settings.maxEpisodesToRetrieve
              )
            )
          )
        );
        this.debug.log('All latest episodes:', allEpisodes);
        this.debug.log('--------------------------');
        return this.mergeEpisodes(allEpisodes);
      })
    );
  }

  getLatestEpisodesByDays(
    forcedUpdate: boolean = false,
    maxEpisodesPerSlice: number = 50
  ): Observable<[Episode[], number[]]> {
    const crawlers = this.crawlers.getActive(forcedUpdate);
    let latestEpisodes: Episode[] = [];
    let slicedEpisodesCount: number = 0;
    if (!maxEpisodesPerSlice) {
      maxEpisodesPerSlice = this.settings.maxEpisodesToRetrieve;
    }

    return concat(
      ...crawlers.map((crawler: BaseCrawler) =>
        crawler.getLatestEpisodes(forcedUpdate)
      )
    ).pipe(
      concatMap((episodes: Episode[], index: number) => {
        const newEpisodes = episodes.slice(
          0,
          Math.min(episodes.length, this.settings.maxEpisodesToRetrieve)
        );
        this.debug.log(`${crawlers[index].name} latest episodes:`, newEpisodes);
        this.debug.log('--------------------------');
        latestEpisodes = this.mergeEpisodes(newEpisodes, latestEpisodes);
        // return as slices (to avoid freezing the UI)
        let continueSlicing: boolean = true;
        return timer(100, 500).pipe(
          // starts after 100 ms & reloop each 500 ms
          takeWhile(() => continueSlicing),
          map((i: number) => {
            let from = i * maxEpisodesPerSlice;
            let to = from + slicedEpisodesCount + maxEpisodesPerSlice;
            if (to >= latestEpisodes.length) {
              to = latestEpisodes.length;
              slicedEpisodesCount = to;
              continueSlicing = false;
            }
            const episodesSlice = latestEpisodes.slice(/*from*/ 0, to);
            const days = this.settings.displayEpisodesDayByDay
              ? this.getEpisodesDays(episodesSlice)
              : [];
            this.debug.log('Slice', i, ':', episodesSlice);
            this.debug.log('Days:', days);
            this.debug.log('----------------------------');
            return [episodesSlice, days];
          })
        ) as Observable<[Episode[], number[]]>;
      })
    );
  }

  private mergeEpisodes(
    episodes: Episode[],
    uniqueEpisodes: Episode[] = []
  ): Episode[] {
    // filter duplicates
    episodes.forEach((episode: Episode) => {
      let index: number = 0;
      for (let uniqueEpisode of uniqueEpisodes) {
        // duplicated
        if (
          isSimilar(
            uniqueEpisode.anime.title,
            episode.anime.title,
            this.settings.episodeSimilarityDegree
          ) &&
          uniqueEpisode.number === episode.number
        ) {
          // merge properties
          if (
            !uniqueEpisodes[index].releaseDate ||
            uniqueEpisodes[index].hasTemporaryReleaseDate
          ) {
            uniqueEpisodes[index].releaseDate = episode.releaseDate;
            uniqueEpisodes[index].hasTemporaryReleaseDate = false;
          }
          if (episode.streamLinks?.length) {
            uniqueEpisodes[index].streamLinks = [
              ...uniqueEpisodes[index].streamLinks,
              ...episode.streamLinks,
            ]; // do not use array.push(...), it duplicates existing links
          }
          if (episode.downloadLinks?.length) {
            uniqueEpisodes[index].downloadLinks = [
              ...uniqueEpisodes[index].downloadLinks,
              ...episode.downloadLinks,
            ];
          }
          if (episode.anime.isNew && !uniqueEpisodes[index].anime.isNew) {
            uniqueEpisodes[index].anime.isNew = episode.anime.isNew;
          }
          if (
            episode.anime.isFinished &&
            !uniqueEpisodes[index].anime.isFinished
          ) {
            uniqueEpisodes[index].anime.isFinished = episode.anime.isFinished;
          }
          return; // ends the current iteration function of episodes.foreach(...), so the code below will not be executed
        }
        index++;
      }
      // not duplicated
      uniqueEpisodes.push({
        ...episode,
        streamLinks: episode.streamLinks || [],
        downloadLinks: episode.downloadLinks || [],
      } as Episode);
    });
    // sort
    if (uniqueEpisodes.length) {
      uniqueEpisodes = uniqueEpisodes.sort((a: Episode, b: Episode) =>
        this.settings.sortEpisodesBy === EpisodeSortingCriteria.FetchingDate
          ? sameDates(a.releaseDate, b.releaseDate)
            ? a.fetchingDate - b.fetchingDate
            : b.releaseDate - a.releaseDate
          : b.releaseDate - a.releaseDate
      );
    }
    return uniqueEpisodes;
  }

  private getEpisodesDays(episodes: Episode[]): number[] {
    let days: number[] = [];
    episodes.forEach((episode: Episode) => {
      if (episode.releaseDate) {
        const day: number = dateOnly(new Date(episode.releaseDate));
        if (days.indexOf(day) === -1) {
          days.push(day);
        }
      }
    });
    return days;
  }
}

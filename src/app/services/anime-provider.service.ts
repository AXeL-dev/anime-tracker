import { Injectable } from '@angular/core';
import { BaseCrawler } from '../crawlers/base.crawler';
import { flatten } from '../helpers/array.helper';
import { ScraperService } from './scraper.service';
import { AnimeKoCrawler } from '../crawlers/animeko.crawler';
import { VostFreeCrawler } from '../crawlers/vostfree.crawler';
import { Episode } from '../models/episode';
import { isSimilar } from '../helpers/string.helper';
import { debug } from '../helpers/debug.helper';
import { Observable } from 'rxjs';

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

  search(title: string): Promise<any> {
    return new Promise(async resolve => {
      const variousResults = await Promise.all(
        this.crawlers.map(async (crawler: BaseCrawler) => {
          const result = await crawler.searchAnime(title);
          return result;
        })
      );
      const results = flatten(variousResults);
      resolve(results);
    });
  }

  getLatest(): Observable<Episode[]> {
    return new Observable(subscriber => {
      let latestEpisodes: Episode[] = [];
      // get latest episodes
      Promise.all(
        this.crawlers.map(async (crawler: BaseCrawler) => {
          const episodes = await crawler.getLatestEpisodes();
          debug(`Crawling ${crawler.name} latest episodes:`);
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
          // emit
          subscriber.next(latestEpisodes);
          return episodes;
        })
      ).finally(() => {
        subscriber.complete();
      });
    });
  }

}

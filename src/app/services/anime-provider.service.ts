import { Injectable } from '@angular/core';
import { BaseCrawler } from '../crawlers/base.crawler';
import { flatten } from '../helpers/array.helper';
import { ScraperService } from './scraper.service';
import { AnimeKoCrawler } from '../crawlers/animeko.crawler';
import { VostFreeCrawler } from '../crawlers/vostfree.crawler';
import { Episode } from '../models/episode';
import { EpisodeRelease } from '../models/episode-release';
import { isSimilar } from '../helpers/string.helper';
import { debug } from '../helpers/debug.helper';

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

  getLatest(): Promise<EpisodeRelease[]> {
    return new Promise(async resolve => {
      // get latest episodes
      const results = await Promise.all(
        this.crawlers.map(async (crawler: BaseCrawler) => {
          const result = await crawler.getLatestEpisodes();
          debug(`Crawling ${crawler.name} latest episodes:`);
          debug(result);
          debug('--------------------------');
          return result;
        })
      );
      // merge result arrays
      const episodes = flatten(results);
      // filter duplicates
      let releases: EpisodeRelease[] = [];
      episodes.forEach((episode: Episode) => {
        let isDuplicated = false;
        releases.forEach((release: EpisodeRelease, index: number) => {
          // duplicated
          if (isSimilar(release.animeTitle, episode.animeTitle) && release.number === episode.number) {
            if (!releases[index].date) {
              releases[index].date = episode.releaseDate;
            }
            releases[index].streamLinks.push({
              url: episode.streamLink,
              lang: episode.subtitlesLang,
              isSubtitled: true
            });
            if (episode.downloadLink) {
              releases[index].downloadLinks.push({
                url: episode.downloadLink,
                lang: episode.subtitlesLang,
                isSubtitled: true
              });
            }
            if (episode.isNew && !releases[index].isNew) {
              releases[index].isNew = episode.isNew;
            }
            if (episode.isLast && !releases[index].isLast) {
              releases[index].isLast = episode.isLast;
            }
            releases[index].sources.push(episode);
            isDuplicated = true;
            return;
          }
        });
        // not duplicated
        if (!isDuplicated) {
          releases.push({
            animeTitle: episode.animeTitle,
            cover: episode.cover,
            date: episode.releaseDate,
            number: episode.number,
            streamLinks: [{
              url: episode.streamLink,
              lang: episode.subtitlesLang,
              isSubtitled: true
            }],
            downloadLinks: episode.downloadLink ? [{
              url: episode.downloadLink,
              lang: episode.subtitlesLang,
              isSubtitled: true
            }] : [],
            isNew: episode.isNew,
            isLast: episode.isLast,
            sources: [episode]
          });
        }
      });
      // sort
      if (releases.length) {
        releases = releases.sort((a: EpisodeRelease, b: EpisodeRelease) => (b.date as number) - (a.date as number));
      }
      resolve(releases);
    });
  }

}

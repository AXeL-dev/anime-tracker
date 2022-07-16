import { LatestEpisodesCrawler } from '../abstract/latest-episodes.crawler';
import { ScraperService } from '../../services/scraper.service';
import { Episode } from '../../models/episode';
import { map, Observable } from 'rxjs';

export class AnimensionCrawler extends LatestEpisodesCrawler {
  constructor(private scraper: ScraperService) {
    super('Animension', 'https://animension.to', 'vosten');
  }

  _getLatestEpisodes(): Observable<Episode[]> {
    return this.scraper
      .getJSON(`${this.baseUrl}/public-api/index.php?page=1&mode=sub`)
      .pipe(
        map((data: [[string, number, number, number, string, number]]) => {
          const latestEpisodes: Episode[] = [];
          try {
            data.forEach((episode) => {
              const [title, slug, _, number, cover, time] = episode;
              latestEpisodes.push({
                anime: {
                  title,
                  cover,
                },
                number,
                streamLinks: [
                  {
                    url: this.filters.concatUrl(`${slug}`),
                    lang: 'vosten',
                  },
                ],
                releaseDate: time * 1000, // convert to unix timestamp
              });
            });
          } catch (error) {
            console.error(`${this.constructor.name}: ${error.message}`);
          }

          return latestEpisodes;
        })
      );
  }
}

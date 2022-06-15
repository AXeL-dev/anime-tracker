import { LatestEpisodesCrawler } from '../abstract/latest-episodes.crawler';
import { ScraperService } from '../../services/scraper.service';
import { Episode } from '../../models/episode';
import { map, Observable } from 'rxjs';

export class AnimensionCrawler extends LatestEpisodesCrawler {
  constructor(private scraper: ScraperService) {
    super('Animension', 'https://animension.to');
  }

  _getLatestEpisodes(): Observable<Episode[]> {
    return this.scraper
      .getRawHTML(`${this.baseUrl}/public-api/index.php?page=1&mode=sub`)
      .pipe(
        map((data: string) => {
          const latestEpisodes: Episode[] = [];
          try {
            const episodes = JSON.parse(data);
            episodes.forEach((episode: any) => {
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
            console.error(error.message);
          }

          return latestEpisodes;
        })
      );
  }
}

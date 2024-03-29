import { LatestEpisodesCrawler } from '../abstract/latest-episodes.crawler';
import { ScraperService } from '../../services/scraper.service';
import { Episode } from '../../models/episode';
import { Observable } from 'rxjs';
import { toNumber } from 'src/app/helpers/number.helper';

export class VoirAnimeOrgCrawler extends LatestEpisodesCrawler {
  constructor(private scraper: ScraperService) {
    super('VoirAnime.org', 'https://voiranime.org', 'vostfr');
    this.filters = {
      ...this.filters,
      title: (text: string) => {
        const title = text
          .trim()
          .match(/(.*) (–|épisode) (\d+) (vostfr|vf)(?:.*)$/i);
        return title?.length ? title[1].trim() : text;
      },
      number: (text: string) => {
        const num = text.trim().match(/(\d+) (vostfr|vf)(?:.*)$/i);
        return toNumber(num?.length ? num[1] : text);
      },
      subtitles: (text: string) => {
        const sub = text.trim().match(/(vostfr|vf)(?:.*)$/i);
        return sub?.length ? sub[1] : 'vostfr';
      },
    };
  }

  _getLatestEpisodes(): Observable<Episode[]> {
    return this.scraper.scrape(
      `${this.baseUrl}`,
      '#content .video-item',
      {
        anime: {
          title: '.item-head > h3 > a | title',
          cover: '.item-thumbnail img@data-src,src',
        },
        number: '.item-head > h3 > a | number',
        streamLinks: [
          {
            url: '.item-head > h3 > a@href',
            lang: '.item-head > h3 > a | subtitles',
          },
        ],
      },
      this.filters
    );
  }
}

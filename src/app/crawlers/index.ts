import { BaseCrawler } from './abstract/base.crawler';
// vostar
import { AddAnimeCrawler } from './vostar/addanime.crawler';
import { AnimeFourUpCrawler } from './vostar/anime4up.crawler';
import { ArabAnimeCrawler } from './vostar/arabanime.crawler';
import { EgyAnimeCrawler } from './vostar/egyanime.crawler';
import { OkanimeCrawler } from './vostar/okanime.crawler';
import { WitAnimeCrawler } from './vostar/witanime.crawler';
import { ZimabdkoCrawler } from './vostar/zimabdko.crawler';
// vosten
import { FourAnimeCrawler } from './vosten/4anime.crawler';
import { AnimeFrenzyCrawler } from './vosten/animefrenzy.crawler';
import { AnimeKisaCrawler } from './vosten/animekisa.crawler';
import { AnimixPlayCrawler } from './vosten/animixplay.crawler';
import { DarkAnimeCrawler } from './vosten/darkanime.crawler';
import { GogoAnimeCrawler } from './vosten/gogoanime.crawler';
import { GogoPlayCrawler } from './vosten/gogoplay.crawler';
import { YugenAnimeCrawler } from './vosten/yugenanime.crawler';
import { GogoAnimeTvCrawler } from './vosten/gogoanimetv.crawler';
import { AnimensionCrawler } from './vosten/animension.crawler';
import { NineAnimeCrawler } from './vosten/9anime.crawler';
import { AnimeDaoCrawler } from './vosten/animedao.crawler';
// vostfr
import { AnimeKoCrawler } from './vostfr/animeko.crawler';
import { AnimeResistanceCrawler } from './vostfr/animeresistance.crawler';
import { FullAnimeVFCrawler } from './vostfr/fullanimevf.crawler';
import { JapMangaCrawler } from './vostfr/japmanga.crawler';
import { MangasVostfrCrawler } from './vostfr/mangas-vostfr.crawler';
import { MavAnimesCrawler } from './vostfr/mavanimes.crawler';
import { NekoSamaCrawler } from './vostfr/neko-sama.crawler';
import { OtakuFrCrawler } from './vostfr/otakufr.crawler';
import { ToonAnimeCrawler } from './vostfr/toonanime.crawler';
import { VoirAnimeCrawler } from './vostfr/voiranime.crawler';
import { VoirAnimeOrgCrawler } from './vostfr/voiranimeorg.crawler';
import { VostFreeCrawler } from './vostfr/vostfree.crawler';
import { WacVostfrCrawler } from './vostfr/wacvostfr.crawler';
import { IAnimeFrCrawler } from './vostfr/ianime-fr.crawler';
import { VostAnimeyCrawler } from './vostfr/vostanimey.crawler';
import { WawAnimesCrawler } from './vostfr/wawanimes.crawler';
import { JetAnimesCrawler } from './vostfr/jetanimes.crawler';
import { AnimeCompletCrawler } from './vostfr/animecomplet.crawler';
import { AnimeMaxCrawler } from './vostfr/anime-max.crawler';
import { BanAnimesCrawler } from './vostfr/bananimes.crawler';
import { ArrElement } from '../models/common';

const crawlersList = {
  vostfr: [
    // keep the ones that provides precise release dates at the top
    AnimeKoCrawler,
    NekoSamaCrawler,
    BanAnimesCrawler,
    VoirAnimeCrawler,
    VoirAnimeOrgCrawler,
    JetAnimesCrawler,
    IAnimeFrCrawler,
    MavAnimesCrawler,
    OtakuFrCrawler,
    VostFreeCrawler,
    MangasVostfrCrawler,
    ToonAnimeCrawler,
    AnimeMaxCrawler,
  ],
  vosten: [
    GogoPlayCrawler,
    AnimensionCrawler,
    YugenAnimeCrawler,
    AnimixPlayCrawler,
    AnimeDaoCrawler,
    GogoAnimeCrawler,
    NineAnimeCrawler,
  ],
  vostar: [
    WitAnimeCrawler,
    AnimeFourUpCrawler,
    ArabAnimeCrawler,
    AddAnimeCrawler,
    OkanimeCrawler,
  ],
};

const crawlers = Object.values(crawlersList).reduce(
  (acc, crawlers) => [...acc, ...crawlers],
  []
);

const getCrawlerName = (Crawler: ArrElement<typeof crawlers>) => {
  const crawler = new Crawler(null);
  return crawler.name;
};

const activeCrawlers = [
  AnimeKoCrawler,
  MavAnimesCrawler,
  AnimensionCrawler,
  NineAnimeCrawler,
  OkanimeCrawler,
].map(getCrawlerName);

const inactiveCrawlers = crawlers
  .map(getCrawlerName)
  .filter((name) => !activeCrawlers.includes(name));

export { BaseCrawler, crawlers, inactiveCrawlers };

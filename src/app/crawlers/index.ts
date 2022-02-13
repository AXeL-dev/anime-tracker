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
import { ElevenAnimCrawler } from './vostfr/11anim.crawler';

const crawlersList = {
  vostfr: [
    // keep the ones that provides precise release dates at the top
    AnimeKoCrawler,
    NekoSamaCrawler,
    VoirAnimeCrawler,
    VoirAnimeOrgCrawler,
    ElevenAnimCrawler,
    MavAnimesCrawler,
    AnimeResistanceCrawler,
    OtakuFrCrawler,
    VostFreeCrawler,
    MangasVostfrCrawler,
    WacVostfrCrawler,
    ToonAnimeCrawler,
  ],
  vosten: [
    GogoPlayCrawler,
    AnimeKisaCrawler,
    YugenAnimeCrawler,
    AnimixPlayCrawler,
    GogoAnimeCrawler,
  ],
  vostar: [
    WitAnimeCrawler,
    AnimeFourUpCrawler,
    ArabAnimeCrawler,
    AddAnimeCrawler,
    OkanimeCrawler,
  ],
};

const crawlers = Object.keys(crawlersList).reduce(
  (acc, key) => [...acc, ...crawlersList[key]],
  []
);

export { BaseCrawler, crawlers };

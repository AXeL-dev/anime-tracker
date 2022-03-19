"use strict";(self.webpackChunkanime_tracker=self.webpackChunkanime_tracker||[]).push([[919],{6622:(W,$,a)=>{a.d($,{x:()=>L,k:()=>E});const L=function(n,D=[]){for(let p=0,C=n.length;p<C;p++){const w=n[p];E(w)?L(w,D):D.push(w)}return D};function E(n){return Array.isArray(n)||n instanceof Array}},3470:(W,$,a)=>{a.d($,{F3:()=>E,ty:()=>n,zO:()=>D,hp:()=>p,Lg:()=>C,Cv:()=>w,m8:()=>u,GW:()=>S,zu:()=>P});const E=["lundi","mardi","mercredi","jeudi","vendredi","samedi","dimanche"],n={janvier:1,f\u00e9vrier:2,mars:3,avril:4,mai:5,juin:6,juillet:7,ao\u00fbt:8,septembre:9,octobre:10,novembre:11,d\u00e9cembre:12},D=()=>new Date,p=f=>f.setHours(0,0,0,0),C=(f=!1)=>{const i=D();return f?i.toISOString().slice(0,10):p(i)},w=(f=!1)=>u(1,f),u=(f,i=!1)=>{const d=new Date(D().getTime()-864e5*f);return i?d.toISOString().slice(0,10):p(d)},S=f=>{const i=D();return p(i)===p(f)},P=(f,i)=>p(new Date(f))===p(new Date(i))},4812:(W,$,a)=>{a.d($,{K:()=>X});var L=a(9646),E=a(4004),n=a(3470);function p(c,r=1){return+c||r}var C=a(4056);class u extends class w{constructor(r,t){this.filters={},this.cache={animeList:[],latestEpisodes:[]},this._name=r,this._baseUrl=t,this._isActive=!0,this.filters={number:e=>p(e),boolean:e=>!!(null==e?void 0:e.length),trim:e=>e.trim(),capitalize:e=>(0,C.kC)(e),decodeUrl:e=>decodeURI(e),encodeUrl:e=>encodeURI(e),concatUrl:e=>/^https?:\/\//.test(e)?e:`${this.baseUrl.replace(/\/$/,"")}/${null==e?void 0:e.replace(/^\//,"")}`,concatProtocol:e=>/^https?:\/\//.test(e)?e:`https://${null==e?void 0:e.replace(/^\/+/,"")}`,date:e=>{var s;const h=null===(s=new Date(e))||void 0===s?void 0:s.getTime(),B=(0,n.zO)().getTime();return h>B?B:h}}}get name(){return this._name}get baseUrl(){return this._baseUrl}get isActive(){return this._isActive}set isActive(r){this._isActive=r}getAnimeList(r=!1){return this.cache.animeList.length>0&&!r?(0,L.of)(this.cache.animeList):this._getAnimeList().pipe((0,E.U)(t=>(this.cache.animeList=t,t)))}getAnimeInfo(r){return this._getAnimeInfo(r).pipe((0,E.U)(t=>(t&&(t.link=r),t)))}getEpisodes(r){return this._getEpisodes(r)}getLatestEpisodes(r=!1){return this.cache.latestEpisodes.length>0&&!r?(0,L.of)(this.cache.latestEpisodes):this._getLatestEpisodes().pipe((0,E.U)(t=>{const e=t.map(s=>Object.assign(Object.assign({},s),{anime:Object.assign(Object.assign({},s.anime),{title:s.anime.title.trim()}),fetchingDate:(new Date).getTime(),releaseDate:s.releaseDate||(0,n.Lg)(),hasTemporaryReleaseDate:!s.releaseDate}));return this.cache.latestEpisodes=e,e}))}searchAnime(r){return this._getAnimeList().pipe((0,E.U)(t=>t.filter(s=>-1!==s.title.toLowerCase().indexOf(r.toLowerCase()))||[]))}}{_getAnimeList(r=!1){return(0,L.of)([])}_getAnimeInfo(r){return(0,L.of)()}_getEpisodes(r){return(0,L.of)([])}}const x={vostfr:[class K extends u{constructor(r){super("AnimeKo","https://animeko.co"),this.scraper=r,this.filters=Object.assign(Object.assign({},this.filters),{cover:t=>{const e=t.replace("/small","");return this.filters.concatUrl(e)},subtitles:t=>"vostfr",date:t=>{var e;let s=t.toLowerCase();return-1!==s.indexOf("aujourd'hui")?(0,n.Lg)():-1!==s.indexOf("hier")?(0,n.Cv)():(s=s.replace(new RegExp("^("+n.F3.join("|")+")","g"),""),s=s.replace(new RegExp("("+Object.keys(n.ty).join("|")+")","g"),h=>n.ty[h]).trim(),s=s.split(" ").reverse().join("-"),null===(e=new Date(s))||void 0===e?void 0:e.getTime())}})}_getLatestEpisodes(){return this.scraper.scrape(`${this.baseUrl}/dernieres-sorties`,".releases ul li.small-card",{anime:{title:"h2 a",cover:"img@data-src | cover",isNew:".badge-status.new | boolean",isFinished:".badge-status.end | boolean",isMovie:".badge-type.movie | boolean"},number:"span.badge-number | number",streamLinks:[{url:"h2 a@href | concatUrl",lang:"| subtitles"}],releaseDate:":prev div .untitle | date"},this.filters)}},class k extends u{constructor(r){super("Neko-sama","https://www.neko-sama.fr"),this.scraper=r,this.filters=Object.assign(Object.assign({},this.filters),{number:t=>{const e=t.match(/Ep. (\d+)/);return p((null==e?void 0:e.length)?e[1]:t)},date:t=>{var e;if(-1!==t.indexOf("minute")||-1!==t.indexOf("heure"))return(0,n.Lg)();if(-1!==t.indexOf("il y a 1 jour"))return(0,n.Cv)();{const s=t.match(/il y a (\d+) jours/);return(null==s?void 0:s.length)?(0,n.m8)(+s[1]):null===(e=new Date(t))||void 0===e?void 0:e.getTime()}}})}_getLatestEpisodes(){return this.scraper.getRawHTML(this.baseUrl).pipe((0,E.U)(r=>{const t=r.match(/lastEpisodes = \[(.*)\]/),e=[];if(null==t?void 0:t.length)try{JSON.parse(`[${t[1]}]`).forEach(h=>{e.push({anime:{title:h.title,cover:h.url_image},number:this.filters.number(h.episode),streamLinks:[{url:this.filters.concatUrl(h.url),lang:"vostfr"}],releaseDate:this.filters.date(h.time)})})}catch(s){console.error(s.message)}return e}))}},class o extends u{constructor(r){super("VoirAnime","https://voiranime.com"),this.scraper=r,this.filters=Object.assign(Object.assign({},this.filters),{cover:t=>t.replace("-110x150",""),subtitles:t=>"vostfr",date:t=>{var e;if(-1!==t.indexOf("mins ago")||-1!==t.indexOf("hours ago"))return(0,n.Lg)();if(-1!==t.indexOf("1 day ago"))return(0,n.Cv)();{const s=t.match(/(\d+) days ago/);return(null==s?void 0:s.length)?(0,n.m8)(+s[1]):null===(e=new Date(t))||void 0===e?void 0:e.getTime()}}})}_getLatestEpisodes(){return this.scraper.scrape(`${this.baseUrl}/?filter=subbed`,"#loop-content .page-item-detail",{anime:{title:".post-title h3 a",cover:"img.img-responsive@src | cover"},number:".chapter-item:first-child .chapter a | number",streamLinks:[{url:[".chapter-item:first-child .chapter a@href",".post-title h3 a@href"],lang:"| subtitles"}],releaseDate:".chapter-item:first-child .post-on | date"},this.filters)}},class b extends u{constructor(r){super("VoirAnime.org","https://voiranime.org"),this.scraper=r,this.filters=Object.assign(Object.assign({},this.filters),{title:t=>{const e=t.trim().match(/(.*) (\u2013|\xe9pisode) (\d+) (vostfr|vf)(?:.*)$/i);return(null==e?void 0:e.length)?e[1].trim():t},number:t=>{const e=t.trim().match(/(\d+) (vostfr|vf)(?:.*)$/i);return p((null==e?void 0:e.length)?e[1]:t)},subtitles:t=>{const e=t.trim().match(/(vostfr|vf)(?:.*)$/i);return(null==e?void 0:e.length)?e[1]:"vostfr"}})}_getLatestEpisodes(){return this.scraper.scrape(`${this.baseUrl}`,"#content .video-item",{anime:{title:".item-head > h3 > a | title",cover:".item-thumbnail img@data-src,src"},number:".item-head > h3 > a | number",streamLinks:[{url:".item-head > h3 > a@href",lang:".item-head > h3 > a | subtitles"}]},this.filters)}},class I extends u{constructor(r){super("VostAnimez","https://vostanimez.com"),this.scraper=r,this.filters=Object.assign(Object.assign({},this.filters),{title:t=>t.replace(/(.*) \(([A-Za-z]+)\)$/i,"$1"),number:t=>{const e=t.match(/(.*) episode (\d+)/i);return(null==e?void 0:e.length)?+e[2]:1},subtitles:t=>{const e=t.match(/(.*) \(([A-Za-z]+)\)$/i);return(null==e?void 0:e.length)?e[2].toLowerCase():"vostfr"}})}_getLatestEpisodes(){return this.scraper.scrape(`${this.baseUrl}/liste-des-episodes/`,"section ul.Episodes > li",{anime:{title:".Title | title",cover:".Image img@src | concatProtocol"},number:".ClB | number",streamLinks:[{url:"article > a@href",lang:".Title | subtitles"}],releaseDate:".Year | date"},this.filters)}},class O extends u{constructor(r){super("JetAnimes","https://www.jetanimes.com"),this.scraper=r;const t=this.filters.date;this.filters=Object.assign(Object.assign({},this.filters),{title:(e,s)=>{var h;if(e)return e;const Y=s.querySelector(".data > h3 > a").getAttribute("href"),Z=Y.split("/"),J=null===(h=Z[Z.length-2])||void 0===h?void 0:h.split("-").join(" ").replace(/saison \d+|episode \d+/gi,"").trim();return J?this.filters.capitalize(J):Y},number:(e,s)=>{let h=e.match(/E(\d+)/i);return(null==h?void 0:h.length)?+h[1]:(h=s.querySelector(".data > h3 > a").getAttribute("href").match(/episode-(\d+)/i),(null==h?void 0:h.length)?+h[1]:1)},subtitles:e=>{const s=e.match(/HD ([A-Za-z]+)$/i);return(null==s?void 0:s.length)?s[1].toLowerCase():"vostfr"},date:e=>{var s;const B=null===(s=e.split("/")[1])||void 0===s?void 0:s.replace(".","").trim();return t(B)}})}_getLatestEpisodes(){return this.scraper.scrape(`${this.baseUrl}/episodes/`,"#archive-content > article",{anime:{title:".data .serie | title",cover:".poster img@src"},number:".data > span:first-of-type | number",streamLinks:[{url:".data > h3 > a@href",lang:".poster .quality | subtitles"}],releaseDate:".data > span:first-of-type | date"},this.filters)}},class y extends u{constructor(r){super("AnimeComplet","https://animecomplet.me"),this.scraper=r,this.filters=Object.assign(Object.assign({},this.filters),{title:t=>t.replace(/vostfr/i,"").trim(),number:t=>{const e=t.match(/Episode (\d+)/i);return(null==e?void 0:e.length)?+e[1]:1},subtitles:t=>{const e=t.match(/Episode (?:\d+) ([A-Za-z]+)$/i);return(null==e?void 0:e.length)?e[1].toLowerCase():"vostfr"},date:t=>{var e;let s=t.toLowerCase();return s=s.replace(new RegExp("("+Object.keys(n.ty).join("|")+")","g"),h=>n.ty[h]).trim(),s=s.split(" ").reverse().join("-"),null===(e=new Date(s))||void 0===e?void 0:e.getTime()}})}_getLatestEpisodes(){return this.scraper.scrape(`${this.baseUrl}`,"ul.recent-posts > li",{anime:{title:".post-content .meta-category > a | title",cover:".post-thumb img@src | concatUrl"},number:".post-content > h2 > a | number",streamLinks:[{url:".post-content > h2 > a@href",lang:".post-content > h2 > a | subtitles"}],releaseDate:".post-content .meta-date | date"},this.filters)}},class _ extends u{constructor(r){super("11Anim","https://11anim.net"),this.scraper=r,this.filters=Object.assign(Object.assign({},this.filters),{title:t=>t.replace("VOSTFR","").replace(/(.*) Episode (\d+)/i,"$1").replace(/ \u2013 $/,""),number:t=>{const e=t.replace("VOSTFR","").match(/(.*) Episode (\d+)/i);return(null==e?void 0:e.length)?+e[2]:1},subtitles:t=>"vostfr",date:t=>{var e;let s=t.replace("Ajout\xe9 le ","").toLowerCase();return s=s.replace(new RegExp("^("+n.F3.join("|")+")","g"),""),s=s.replace(new RegExp("("+Object.keys(n.ty).join("|")+")","g"),h=>n.ty[h]).trim(),s=s.split(" ").reverse().join("-"),null===(e=new Date(s))||void 0===e?void 0:e.getTime()}})}_getLatestEpisodes(){return this.scraper.scrape(`${this.baseUrl}`,"#main .loop > article",{anime:{title:"div > a > span | title",cover:"div img@src | concatUrl"},number:"div > a > span | number",streamLinks:[{url:"div > a@href",lang:"| subtitles"}],releaseDate:".entry-meta > span > small | date"},this.filters)}},class g extends u{constructor(r){super("MavAnimes","http://www.mavanimes.co"),this.scraper=r,this.filters=Object.assign(Object.assign({},this.filters),{cover:t=>-1!==t.indexOf(",")?t.split(",")[0].replace(/ (\d+\w)$/,""):t.replace("-300x169",""),number:t=>{const e=t.replace("VOSTFR","").match(/(.*) (\d+)/);return(null==e?void 0:e.length)?+e[2]:1},title:t=>t.replace("VOSTFR","").replace(/(.*) (\d+)/,"$1").replace(/ \u2013 $/,""),subtitles:t=>"vostfr"})}_getLatestEpisodes(){return this.scraper.scrape(`${this.baseUrl}`,"div.animes-grid div.grid-item > div",{anime:{title:"p | title",cover:"img.wp-post-image@srcset,src,data-cfsrc | cover"},number:"p | number",streamLinks:[{url:"a@href",lang:"| subtitles"}]},this.filters)}},class H extends u{constructor(r){super("AnimeResistance","https://animeresistance.co"),this.scraper=r,this.filters=Object.assign(Object.assign({},this.filters),{number:t=>{const e=t.match(/EP. (\d+)/);return p((null==e?void 0:e.length)?e[1]:t)},subtitles:t=>"vostfr",date:t=>{var e;if(-1!==t.indexOf("minute")||-1!==t.indexOf("heure"))return(0,n.Lg)();if(-1!==t.indexOf("il y a 1 jour"))return(0,n.Cv)();{const s=t.match(/il y a (\d+) jours/);return(null==s?void 0:s.length)?(0,n.m8)(+s[1]):null===(e=new Date(t))||void 0===e?void 0:e.getTime()}}})}_getLatestEpisodes(){return this.scraper.scrape(`${this.baseUrl}`,".container .row .card",{anime:{title:"a.title",cover:"a.thumbnail-link img@src | concatUrl"},number:".number | number",streamLinks:[{url:"a.thumbnail-link@href | concatUrl",lang:"| subtitles"}],releaseDate:".published | date"},this.filters)}},class l extends u{constructor(r){super("OtakuFr","https://otakufr.co"),this.scraper=r,this.filters=Object.assign(Object.assign({},this.filters),{title:t=>{const e=t.trim().match(/(.*) (\d+) vostfr(?:.*)$/i);return(null==e?void 0:e.length)?e[1].trim():t},number:t=>{const e=t.trim().match(/(\d+) vostfr(?:.*)$/i);return p((null==e?void 0:e.length)?e[1]:t)},subtitles:t=>(null==t?void 0:t.length)?t.toLowerCase().trim():"vostfr",date:t=>{var e;let s=t.toLowerCase();return s=s.replace(new RegExp("^("+n.F3.join("|")+")","g"),""),s=s.replace(new RegExp("("+Object.keys(n.ty).join("|")+")","g"),h=>n.ty[h]).trim(),s=s.split(" ").reverse().join("-"),null===(e=new Date(s))||void 0===e?void 0:e.getTime()}})}_getLatestEpisodes(){return this.scraper.scrape(`${this.baseUrl}`,".section-1 > article.episode",{anime:{title:"a.episode-link | title",cover:"figure img@src"},number:"a.episode-link | number",streamLinks:[{url:"a.episode-link@href",lang:".traduction | subtitles"}],releaseDate:":prev div.title | date"},this.filters)}},class T extends u{constructor(r){super("VostFree","https://vostfree.com"),this.scraper=r,this.filters=Object.assign(Object.assign({},this.filters),{title:t=>t.replace(/ VOSTFR(?:.*)$/,""),cover:t=>this.filters.concatUrl(t),date:t=>{var e;let s=t.toLowerCase();if(-1!==s.indexOf("aujourd'hui"))return(0,n.Lg)();if(-1!==s.indexOf("hier"))return(0,n.Cv)();{const h=s.split(",");return s=h[0].split("-").reverse().join("-")+h[1],null===(e=new Date(s.replace(",","")))||void 0===e?void 0:e.getTime()}}})}_getLatestEpisodes(){return this.scraper.scrape(`${this.baseUrl}/animes-vostfr`,"#content div.movie-poster",{anime:{title:".info .title | title",cover:".image img@src,data-cfsrc | cover",isNew:".anime-new | boolean",isFinished:".anime-fin | boolean"},number:".alt .year b | number",streamLinks:[{url:".play a.link@href",lang:".quality"}],releaseDate:".info ul.additional li.type:first-child a | date"},this.filters)}},class N extends u{constructor(r){super("Mangas-vostfr","https://mangas-vostfr.com"),this.scraper=r,this.filters=Object.assign(Object.assign({},this.filters),{number:t=>{const e=t.replace("Vostfr","").match(/(.*) (\d+)/);return(null==e?void 0:e.length)?+e[2]:1},title:t=>t.replace("Vostfr","").replace(/(.*) (\d+)/,"$1").trim(),subtitles:t=>"vostfr",date:t=>{var e;let s=t.toLowerCase();return s=s.replace(new RegExp("("+Object.keys(n.ty).join("|")+")","g"),h=>n.ty[h]).trim(),s=s.split(" ").reverse().join("-"),null===(e=new Date(s))||void 0===e?void 0:e.getTime()}})}_getLatestEpisodes(){return this.scraper.scrape(`${this.baseUrl}`,"#content_box > article",{anime:{title:"h2.title a | title",cover:".featured-thumbnail img@data-lazy-src,src"},number:"h2.title a | number",streamLinks:[{url:"h2.title a@href",lang:"| subtitles"}],releaseDate:".post-info .date span | date"},this.filters)}},class F extends u{constructor(r){super("WacVostfr","https://wacvostfr.com"),this.scraper=r,this.filters=Object.assign(Object.assign({},this.filters),{title:t=>{const e=t.trim().match(/(.*) (\u2013|\xe9pisode) (\d+) (vostfr|vf)(?:.*)$/i);return(null==e?void 0:e.length)?e[1].trim():t},number:t=>{const e=t.trim().match(/(\d+) (vostfr|vf)(?:.*)$/i);return p((null==e?void 0:e.length)?e[1]:t)},cover:t=>{const e=this.filters.title(t);return this.filters.concatUrl(`/imgs/animes/${(0,C.lV)(e,"-")}.jpg`)},subtitles:t=>{const e=t.trim().match(/(vostfr|vf)(?:.*)$/i);return(null==e?void 0:e.length)?e[1]:"vostfr"}})}_getLatestEpisodes(){return this.scraper.scrape(`${this.baseUrl}`,"#posts-list + .card.mt-4 ul > a",{anime:{title:":self | title",cover:":self | cover"},number:":self | number",streamLinks:[{url:":self@href | concatUrl",lang:":self | subtitles"}]},this.filters)}},class m extends u{constructor(r){super("ToonAnime","https://wvvw.toonanime.tv"),this.scraper=r,this.filters=Object.assign(Object.assign({},this.filters),{title:t=>t.replace(/vostfr/i,"").trim(),number:t=>{const e=t.match(/EP (\d+)/);return p((null==e?void 0:e.length)?e[1]:t)},subtitles:t=>(null==t?void 0:t.length)?t.toLowerCase().trim():"vostfr"})}_getLatestEpisodes(){return this.scraper.scrape(`${this.baseUrl}/anime-vostfr/`,"#dle-content > article",{anime:{title:"footer > div.short__story-title | title",cover:"img@data-src,src | concatUrl"},number:".progress__box > div | number",streamLinks:[{url:"a@href",lang:".label__rate | subtitles"}]},this.filters)}}],vosten:[class z extends u{constructor(r){super("GogoPlay","https://gogoplay1.com"),this.scraper=r,this.filters=Object.assign(Object.assign({},this.filters),{title:t=>{const e=t.match(/(.*) Episode (\d+)/);return(null==e?void 0:e.length)?e[1].trim():t},number:t=>{const e=t.match(/Episode (\d+)/);return p((null==e?void 0:e.length)?e[1]:t)},subtitles:t=>"vosten",date:t=>{var e;if(-1!==t.indexOf("mins ago")||-1!==t.indexOf("hours ago"))return(0,n.Lg)();if(-1!==t.indexOf("1 day ago"))return(0,n.Cv)();{const s=t.match(/(\d+) days ago/);return(null==s?void 0:s.length)?(0,n.m8)(+s[1]):null===(e=new Date(t))||void 0===e?void 0:e.getTime()}}})}_getLatestEpisodes(){return this.scraper.scrape(`${this.baseUrl}`,"ul.listing.items > li",{anime:{title:".name | title",cover:".picture img@src"},number:".name | number",streamLinks:[{url:"a@href | concatUrl",lang:"| subtitles"}],releaseDate:".meta > .date | date"},this.filters)}},class v extends u{constructor(r){super("AnimeKisa","https://animekisa.tv"),this.scraper=r,this.filters=Object.assign(Object.assign({},this.filters),{number:t=>{const e=t.match(/Episode (\d+)/);return p((null==e?void 0:e.length)?e[1]:t)},subtitles:t=>"vosten",date:t=>1e3*+t})}_getLatestEpisodes(){return this.scraper.scrape(`${this.baseUrl}`,".listAnimes > div.episode-box",{anime:{title:".title-box > div",cover:".image-box img@src,data-cfsrc | concatUrl"},number:".info-box > div | number",streamLinks:[{url:".episode-box-2 a.an:first-child@href | concatUrl",lang:"| subtitles"}],releaseDate:".info-box > div > time@time | date"},this.filters)}},class V extends u{constructor(r){super("YugenAnime","https://yugenani.me"),this.scraper=r,this.filters=Object.assign(Object.assign({},this.filters),{cover:t=>{const e=t.trim().match(/this\.src='(.*)'$/i);return(null==e?void 0:e.length)?e[1]:t},number:t=>{const e=t.trim().match(/(\d+) (?:.*)$/i);return p((null==e?void 0:e.length)?e[1]:t)},subtitles:t=>"vosten"})}_getLatestEpisodes(){return this.scraper.scrape(`${this.baseUrl}/latest`,"section ul.ep-grid li.ep-card",{anime:{title:"a.ep-details .ep-origin-name",cover:"a.ep-thumbnail img@onerror,data-src,src | cover"},number:"a.ep-title | number",streamLinks:[{url:"a.ep-thumbnail@href | concatUrl",lang:"| subtitles"}],releaseDate:"a.ep-details .ep-statistics time@datetime | date"},this.filters)}},class A extends u{constructor(r){super("AnimixPlay","https://animixplay.to"),this.scraper=r,this.filters=Object.assign(Object.assign({},this.filters),{number:t=>{const e=t.match(/EP (\d+)/);return p((null==e?void 0:e.length)?e[1]:t)},subtitles:t=>"vosten",date:t=>{var e;if(-1!==t.indexOf("mins ago")||-1!==t.indexOf("hours ago"))return(0,n.Lg)();if(-1!==t.indexOf("1 day ago"))return(0,n.Cv)();{const s=t.match(/(\d+) days ago/);return(null==s?void 0:s.length)?(0,n.m8)(+s[1]):null===(e=new Date(t))||void 0===e?void 0:e.getTime()}}})}_getLatestEpisodes(){return this.scraper.scrape(`${this.baseUrl}`,"#resultplace ul li",{anime:{title:"a .details .name",cover:"a img.resultimg@src"},number:"a .details .infotext | number",streamLinks:[{url:"a@href | concatUrl",lang:"| subtitles"}],releaseDate:"a .timetext | date"},this.filters)}},class R extends u{constructor(r){super("GogoAnime","https://gogoanime.pe"),this.scraper=r,this.filters=Object.assign(Object.assign({},this.filters),{number:t=>{const e=t.match(/Episode (\d+)/);return p((null==e?void 0:e.length)?e[1]:t)},subtitles:t=>-1!==(null==t?void 0:t.indexOf("ic-DUB"))?"dub":"vosten"})}_getLatestEpisodes(){return this.scraper.scrape(`${this.baseUrl}`,".last_episodes ul li",{anime:{title:"p.name a",cover:"div.img img@src"},number:"p.episode | number",streamLinks:[{url:"p.name a@href | concatUrl",lang:".type@class | subtitles"}]},this.filters)}}],vostar:[class d extends u{constructor(r){super("WitAnime","https://witanime.com"),this.scraper=r,this.filters=Object.assign(Object.assign({},this.filters),{number:t=>{const e=t.match(/(.*) (\d+)/);return(null==e?void 0:e.length)?+e[2]:1},subtitles:t=>"vostar"})}_getLatestEpisodes(){return this.scraper.scrape(`${this.baseUrl}`,"body > div.page-content-container:not(.content) .episodes-list-content .episodes-card-container",{anime:{title:".ep-card-anime-title > h3 > a",cover:".episodes-card > div > img@src"},number:".episodes-card-title > h3 > a | number",streamLinks:[{url:".episodes-card > div > a@href | decodeUrl",lang:"| subtitles"}]},this.filters)}},class P extends u{constructor(r){super("Anime4up","https://w1.anime4up.com"),this.scraper=r,this.filters=Object.assign(Object.assign({},this.filters),{number:t=>{const e=t.match(/(.*) (\d+)/);return(null==e?void 0:e.length)?+e[2]:1},subtitles:t=>"vostar"})}_getLatestEpisodes(){return this.scraper.scrape(`${this.baseUrl}`,["body > div:nth-child(6).page-content-container .episodes-list-content .episodes-card-container","body > div:nth-child(8).page-content-container .episodes-list-content .episodes-card-container"],{anime:{title:".ep-card-anime-title > h3 > a",cover:".episodes-card > div > img@src"},number:".episodes-card-title > h3 > a | number",streamLinks:[{url:".episodes-card > div > a@href | decodeUrl",lang:"| subtitles"}]},this.filters)}},class f extends u{constructor(r){super("ArabAnime","https://www.arabanime.net"),this.scraper=r,this.filters=Object.assign(Object.assign({},this.filters),{number:t=>{const e=t.match(/(.*) (\d+)/);return(null==e?void 0:e.length)?+e[2]:1},subtitles:t=>"vostar"})}_getLatestEpisodes(){return this.scraper.scrape(`${this.baseUrl}`,"section#specials > .container > .row > .col-6",{anime:{title:"a.as-info@title | trim",cover:"img.img-fluid@src"},number:"a.as-info > h3 > span | number",streamLinks:[{url:"a.as-info@href | concatUrl",lang:"| subtitles"}]},this.filters)}},class S extends u{constructor(r){super("AddAnime","https://apk.addanime.online"),this.scraper=r,this.filters=Object.assign(Object.assign({},this.filters),{title:t=>t.split("|")[0].trim(),number:t=>{const e=t.match(/(.*) (\d+)/);return(null==e?void 0:e.length)?+e[2]:1},subtitles:t=>"vostar"})}_getLatestEpisodes(){return this.scraper.scrape(`${this.baseUrl}/episode`,"body > .container > .anime-list-content > .row > div",{anime:{title:".anime-card-details > .anime-card-title@title | title",cover:".anime-card-poster img@src"},number:".anime-card-poster .episodes-card-title > h3 > a | number",streamLinks:[{url:".anime-card-poster .episodes-card-title > h3 > a@href | decodeUrl",lang:"| subtitles"}]},this.filters)}},class i extends u{constructor(r){super("OKanime","https://okanime.tv"),this.scraper=r,this.filters=Object.assign(Object.assign({},this.filters),{subtitles:t=>"vostar"})}_getLatestEpisodes(){return this.scraper.scrape(`${this.baseUrl}/dashboard/newest_episodes`,".latest-episodes > div.row > .item",{anime:{title:"span.video-title",cover:".batnie-image img@data-src | concatUrl"},number:"span.video-subtitle span | number",streamLinks:[{url:"a@href | concatUrl",lang:"| subtitles"}]},this.filters)}}]},j=Object.keys(x).reduce((c,r)=>[...c,...x[r]],[]);var U=a(1223),M=a(8798),G=a(452);let X=(()=>{class c{constructor(t,e){this.scraper=t,this.settings=e,this.crawlers=[];for(const s of j)this.add(new s(this.scraper));this.update()}update(){this.crawlers.forEach(t=>{t.isActive=-1===this.settings.inactiveCrawlers.indexOf(t.name)})}add(t){this.crawlers.push(t)}remove(t){this.crawlers=this.crawlers.filter(e=>e.name!==t.name)}get(...t){return this.crawlers.filter(e=>-1!==t.indexOf(e.name))}getAll(t=!1){return t&&this.update(),this.crawlers}getAllExcept(...t){return this.crawlers.filter(e=>-1===t.indexOf(e.name))}getActive(t=!1){return t&&this.update(),this.crawlers.filter(e=>e.isActive)}get count(){return this.getAll().length}get activeCount(){return this.getActive().length}}return c.\u0275fac=function(t){return new(t||c)(U.LFG(M.V),U.LFG(G.g))},c.\u0275prov=U.Yz7({token:c,factory:c.\u0275fac,providedIn:"root"}),c})()},8798:(W,$,a)=>{a.d($,{V:()=>N});var L=a(9646),E=a(1566),n=a(1165),D=a(4482),p=a(8421),C=a(3888),w=a(5403),u=a(9672);const S=(0,C.d)(g=>function(l=null){g(this),this.message="Timeout has occurred",this.name="TimeoutError",this.info=l});function f(g){throw new S(g)}var i=a(4004),d=a(262),v=a(5012),A=a(1223),R=a(520),z=a(4056),V=a(6622);let K=(()=>{class g{constructor(){this.parser=new DOMParser}fromString(l){return this.parser.parseFromString(l,"text/html")}parse(l,m,o,b){let T=[];const F=this.fromString(l),_=(0,V.k)(m)?m.join(", "):m;return F.querySelectorAll(_).forEach(I=>{const O={};Object.keys(o).forEach(y=>{(0,z.HD)(o[y])?O[y]=this.find(I,o[y],b):(0,V.k)(o[y])?(O[y]=[],o[y].forEach(x=>{if((0,z.HD)(x))O[y].push(this.find(I,x,b));else{let j={};Object.keys(x).forEach(U=>{j[U]=this.parseSelector(I,x[U],b)}),O[y].push(j)}})):(O[y]={},Object.keys(o[y]).forEach(x=>{O[y][x]=this.parseSelector(I,o[y][x],b)}))}),T.push(O)}),T}parseSelector(l,m,o){if(!(0,V.k)(m))return this.find(l,m,o);for(const b of m){const T=this.find(l,b,o);if(T)return T}}find(l,m,o){var b,T,F,_,I,O;const y=m.split("|"),x=y[0].split("@"),j={selector:null===(b=x[0])||void 0===b?void 0:b.trim(),attributes:null===(T=x[1])||void 0===T?void 0:T.trim().split(","),filter:null===(F=y[1])||void 0===F?void 0:F.trim()};let U=null,M="";try{(null===(_=j.selector)||void 0===_?void 0:_.length)&&(U=j.selector.startsWith(":prev ")?this.getPreviousSibling(l,j.selector.replace(":prev ","")):j.selector.startsWith(":next ")?this.getNextSibling(l,j.selector.replace(":next ","")):j.selector.startsWith(":self")?l:l.querySelector(j.selector))}catch(G){console.error(G.message)}return U&&((null===(I=j.attributes)||void 0===I?void 0:I.length)?j.attributes.forEach(G=>{(null==M?void 0:M.length)||(M=U.getAttribute(G))}):M=U.innerHTML),(null===(O=j.filter)||void 0===O?void 0:O.length)&&(null==o?void 0:o[j.filter])&&(M=o[j.filter](M,l)),M}getPreviousSibling(l,m){let o=l.previousElementSibling;if(!m)return o;for(;o;){if(o.matches(m))return o;const b=o.querySelector(m);if(b)return b;o=o.previousElementSibling}return null}getNextSibling(l,m){let o=l.nextElementSibling;if(!m)return o;for(;o;){if(o.matches(m))return o;const b=o.querySelector(m);if(b)return b;o=o.nextElementSibling}return null}}return g.\u0275fac=function(l){return new(l||g)},g.\u0275prov=A.Yz7({token:g,factory:g.\u0275fac,providedIn:"root"}),g})();var H=a(452);let N=(()=>{class g{constructor(l,m,o){this.httpClient=l,this.htmlParser=m,this.settings=o}get proxy(){return v._[this.settings.proxy.name]}scrape(l,m,o,b){return this.getRawHTML(l).pipe((0,i.U)(T=>this.htmlParser.parse(T,m,o,b)))}getRawHTML(l,m=3e4){return this.httpClient.get(this.resolveUrl(l),{responseType:"text",headers:this.getRequestHeaders()}).pipe(function P(g,k){const{first:l,each:m,with:o=f,scheduler:b=(null!=k?k:E.z),meta:T=null}=(0,n.q)(g)?{first:g}:"number"==typeof g?{each:g}:g;if(null==l&&null==m)throw new TypeError("No timeout provided.");return(0,D.e)((F,_)=>{let I,O,y=null,x=0;const j=U=>{O=(0,u.f)(_,b,()=>{try{I.unsubscribe(),(0,p.Xf)(o({meta:T,lastValue:y,seen:x})).subscribe(_)}catch(M){_.error(M)}},U)};I=F.subscribe((0,w.x)(_,U=>{null==O||O.unsubscribe(),x++,_.next(y=U),m>0&&j(m)},void 0,void 0,()=>{(null==O?void 0:O.closed)||null==O||O.unsubscribe(),y=null})),j(null!=l?"number"==typeof l?l:+l-b.now():m)})}(m),(0,d.K)(o=>{const b=this.resolveError(o,l);return console.error(b),(0,L.of)("")}))}resolveError(l,m){return"Timeout has occurred"===l.message?`${l.message} for ${m}`:l.message}resolveUrl(l){return this.settings.proxy.enabled?`${this.proxy.url}${l}`:l}getRequestHeaders(){const l=this.settings.proxy.enabled?this.proxy.headers:null;return l?Object.keys(l).reduce((m,o)=>Object.assign(Object.assign({},m),{[o]:this.resolveHeaderValue(l[o])}),{}):{}}resolveHeaderValue(l){switch(l){case"$hostname":return window.location.hostname;case"$apiKey":return this.settings.proxy.apiKey;default:return l}}}return g.\u0275fac=function(l){return new(l||g)(A.LFG(R.eN),A.LFG(K),A.LFG(H.g))},g.\u0275prov=A.Yz7({token:g,factory:g.\u0275fac,providedIn:"root"}),g})()},4128:(W,$,a)=>{a.d($,{D:()=>u});var L=a(8306),E=a(4742),n=a(8421),D=a(3269),p=a(5403),C=a(3268),w=a(1810);function u(...S){const P=(0,D.jO)(S),{args:f,keys:i}=(0,E.D)(S),d=new L.y(v=>{const{length:A}=f;if(!A)return void v.complete();const R=new Array(A);let z=A,V=A;for(let K=0;K<A;K++){let H=!1;(0,n.Xf)(f[K]).subscribe((0,p.x)(v,N=>{H||(H=!0,V--),R[K]=N},()=>z--,void 0,()=>{(!z||!H)&&(V||v.next(i?(0,w.n)(i,R):R),v.complete())}))}});return P?d.pipe((0,C.Z)(P)):d}},2805:(W,$,a)=>{a.d($,{H:()=>p});var L=a(8306),E=a(1566),n=a(3532),D=a(1165);function p(C=0,w,u=E.P){let S=-1;return null!=w&&((0,n.K)(w)?u=w:S=w),new L.y(P=>{let f=(0,D.q)(C)?+C-u.now():C;f<0&&(f=0);let i=0;return u.schedule(function(){P.closed||(P.next(i++),0<=S?this.schedule(void 0,S):P.complete())},f)})}},1566:(W,$,a)=>{a.d($,{P:()=>P,z:()=>S});var L=a(727);class E extends L.w0{constructor(i,d){super()}schedule(i,d=0){return this}}const n={setInterval(...f){const{delegate:i}=n;return((null==i?void 0:i.setInterval)||setInterval)(...f)},clearInterval(f){const{delegate:i}=n;return((null==i?void 0:i.clearInterval)||clearInterval)(f)},delegate:void 0};var D=a(8737);const C={now:()=>(C.delegate||Date).now(),delegate:void 0};class w{constructor(i,d=w.now){this.schedulerActionCtor=i,this.now=d}schedule(i,d=0,v){return new this.schedulerActionCtor(this,i).schedule(v,d)}}w.now=C.now;const S=new class u extends w{constructor(i,d=w.now){super(i,d),this.actions=[],this._active=!1,this._scheduled=void 0}flush(i){const{actions:d}=this;if(this._active)return void d.push(i);let v;this._active=!0;do{if(v=i.execute(i.state,i.delay))break}while(i=d.shift());if(this._active=!1,v){for(;i=d.shift();)i.unsubscribe();throw v}}}(class p extends E{constructor(i,d){super(i,d),this.scheduler=i,this.work=d,this.pending=!1}schedule(i,d=0){if(this.closed)return this;this.state=i;const v=this.id,A=this.scheduler;return null!=v&&(this.id=this.recycleAsyncId(A,v,d)),this.pending=!0,this.delay=d,this.id=this.id||this.requestAsyncId(A,this.id,d),this}requestAsyncId(i,d,v=0){return n.setInterval(i.flush.bind(i,this),v)}recycleAsyncId(i,d,v=0){if(null!=v&&this.delay===v&&!1===this.pending)return d;n.clearInterval(d)}execute(i,d){if(this.closed)return new Error("executing a cancelled action");this.pending=!1;const v=this._execute(i,d);if(v)return v;!1===this.pending&&null!=this.id&&(this.id=this.recycleAsyncId(this.scheduler,this.id,null))}_execute(i,d){let A,v=!1;try{this.work(i)}catch(R){v=!0,A=R||new Error("Scheduled action threw falsy error")}if(v)return this.unsubscribe(),A}unsubscribe(){if(!this.closed){const{id:i,scheduler:d}=this,{actions:v}=d;this.work=this.state=this.scheduler=null,this.pending=!1,(0,D.P)(v,this),null!=i&&(this.id=this.recycleAsyncId(d,i,null)),this.delay=null,super.unsubscribe()}}}),P=S},1165:(W,$,a)=>{function L(E){return E instanceof Date&&!isNaN(E)}a.d($,{q:()=>L})}}]);
(self.webpackChunkanime_tracker=self.webpackChunkanime_tracker||[]).push([[676],{5758:function(e,t,s){"use strict";s.d(t,{D:function(){return c}});var r=s(7574),i=s(9796),n=s(8002),a=s(1555),l=s(4402);function c(...e){if(1===e.length){const t=e[0];if((0,i.k)(t))return o(t,null);if((0,a.K)(t)&&Object.getPrototypeOf(t)===Object.prototype){const e=Object.keys(t);return o(e.map(e=>t[e]),e)}}if("function"==typeof e[e.length-1]){const t=e.pop();return o(e=1===e.length&&(0,i.k)(e[0])?e[0]:e,null).pipe((0,n.U)(e=>t(...e)))}return o(e,null)}function o(e,t){return new r.y(s=>{const r=e.length;if(0===r)return void s.complete();const i=new Array(r);let n=0,a=0;for(let c=0;c<r;c++){const o=(0,l.D)(e[c]);let u=!1;s.add(o.subscribe({next:e=>{u||(u=!0,a++),i[c]=e},error:e=>s.error(e),complete:()=>{n++,n!==r&&u||(a===r&&s.next(t?t.reduce((e,t,s)=>(e[t]=i[s],e),{}):i),s.complete())}}))}})}},1456:function(e,t,s){"use strict";s.d(t,{P:function(){return l}});var r=s(5319);class i extends r.w{constructor(e,t){super()}schedule(e,t=0){return this}}let n=(()=>{class e{constructor(t,s=e.now){this.SchedulerAction=t,this.now=s}schedule(e,t=0,s){return new this.SchedulerAction(this,e).schedule(s,t)}}return e.now=()=>Date.now(),e})();class a extends n{constructor(e,t=n.now){super(e,()=>a.delegate&&a.delegate!==this?a.delegate.now():t()),this.actions=[],this.active=!1,this.scheduled=void 0}schedule(e,t=0,s){return a.delegate&&a.delegate!==this?a.delegate.schedule(e,t,s):super.schedule(e,t,s)}flush(e){const{actions:t}=this;if(this.active)return void t.push(e);let s;this.active=!0;do{if(s=e.execute(e.state,e.delay))break}while(e=t.shift());if(this.active=!1,s){for(;e=t.shift();)e.unsubscribe();throw s}}}const l=new a(class extends i{constructor(e,t){super(e,t),this.scheduler=e,this.work=t,this.pending=!1}schedule(e,t=0){if(this.closed)return this;this.state=e;const s=this.id,r=this.scheduler;return null!=s&&(this.id=this.recycleAsyncId(r,s,t)),this.pending=!0,this.delay=t,this.id=this.id||this.requestAsyncId(r,this.id,t),this}requestAsyncId(e,t,s=0){return setInterval(e.flush.bind(e,this),s)}recycleAsyncId(e,t,s=0){if(null!==s&&this.delay===s&&!1===this.pending)return t;clearInterval(t)}execute(e,t){if(this.closed)return new Error("executing a cancelled action");this.pending=!1;const s=this._execute(e,t);if(s)return s;!1===this.pending&&null!=this.id&&(this.id=this.recycleAsyncId(this.scheduler,this.id,null))}_execute(e,t){let s,r=!1;try{this.work(e)}catch(i){r=!0,s=!!i&&i||new Error(i)}if(r)return this.unsubscribe(),s}_unsubscribe(){const e=this.id,t=this.scheduler,s=t.actions,r=s.indexOf(this);this.work=null,this.state=null,this.pending=!1,this.scheduler=null,-1!==r&&s.splice(r,1),null!=e&&(this.id=this.recycleAsyncId(t,e,null)),this.delay=null}})},6622:function(e,t,s){"use strict";s.d(t,{x:function(){return r},k:function(){return i}});const r=function(e,t=[]){for(let s=0,n=e.length;s<n;s++){const n=e[s];i(n)?r(n,t):t.push(n)}return t};function i(e){return Array.isArray(e)||e instanceof Array}},3470:function(e,t,s){"use strict";s.d(t,{F3:function(){return r},ty:function(){return i},zO:function(){return n},hp:function(){return a},Lg:function(){return l},Cv:function(){return c},m8:function(){return o},GW:function(){return u},zu:function(){return h}});const r=["lundi","mardi","mercredi","jeudi","vendredi","samedi","dimanche"],i={janvier:1,"f\xe9vrier":2,mars:3,avril:4,mai:5,juin:6,juillet:7,"ao\xfbt":8,septembre:9,octobre:10,novembre:11,"d\xe9cembre":12},n=()=>new Date,a=e=>e.setHours(0,0,0,0),l=(e=!1)=>{const t=n();return e?t.toISOString().slice(0,10):a(t)},c=(e=!1)=>o(1,e),o=(e,t=!1)=>{const s=new Date(n().getTime()-864e5*e);return t?s.toISOString().slice(0,10):a(s)},u=e=>{const t=n();return a(t)===a(e)},h=(e,t,s)=>(e?a(new Date(e)):s)===(t?a(new Date(t)):s)},4056:function(e,t,s){"use strict";function r(e){return"string"==typeof e||!!e&&"object"==typeof e&&"[object String]"===Object.prototype.toString.call(e)}function i(e,t,s=.7,r=!1){const i=e.toLowerCase().replace(/[-_~:,;'".]/g,""),n=t.toLowerCase().replace(/[-_~:,;'".]/g,"");return i===n||!r&&(-1!==i.indexOf(n)||-1!==n.indexOf(i))||function(e,t){let s=e,r=t;e.length<t.length&&(s=t,r=e);let i=s.length;return 0==i?1:(i-function(e,t){e=e.toLowerCase(),t=t.toLowerCase();let s=new Array;for(let r=0;r<=e.length;r++){let i=r;for(let n=0;n<=t.length;n++)if(0==r)s[n]=n;else if(n>0){let a=s[n-1];e.charAt(r-1)!=t.charAt(n-1)&&(a=Math.min(Math.min(a,i),s[n])+1),s[n-1]=i,i=a}r>0&&(s[t.length]=i)}return s[t.length]}(s,r))/i}(i,n)>=s}function n(e,t){const s="\xe0\xe1\xe4\xe2\xe3\xe8\xe9\xeb\xea\xec\xed\xef\xee\xf2\xf3\xf6\xf4\xf9\xfa\xfc\xfb\xf1\xe7\xdf\xff\u0153\xe6\u0155\u015b\u0144\u1e55\u1e83\u01f5\u01f9\u1e3f\u01d8\u1e8d\u017a\u1e27&\xb7/_,:;",r=new RegExp(s.split("").join("|"),"g"),i=t?()=>t:e=>"aaaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh-------".charAt(s.indexOf(e));return e.toString().toLowerCase().replace(/\s+/g,"-").replace(r,i).replace(/[^\w\-]+/g,"").replace(/\-\-+/g,"-").replace(/^-+/,"").replace(/-+$/,"")}s.d(t,{HD:function(){return r},T0:function(){return i},lV:function(){return n}})},5923:function(e,t,s){"use strict";s.d(t,{K:function(){return z}});var r=s(5917),i=s(8002),n=s(3470);function a(e,t=1){return+e||t}class l extends class{constructor(e,t){this.filters={},this.cache={animeList:[],latestEpisodes:[]},this._name=e,this._baseUrl=t,this._isActive=!0,this.filters={number:e=>a(e),boolean:e=>!!(null==e?void 0:e.length),trim:e=>e.trim(),decodeUrl:e=>decodeURI(e),encodeUrl:e=>encodeURI(e),concatUrl:e=>/^https?:\/\//.test(e)?e:`${this.baseUrl.replace(/\/$/,"")}/${null==e?void 0:e.replace(/^\//,"")}`,date:e=>{var t;return null===(t=new Date(e))||void 0===t?void 0:t.getTime()}}}get name(){return this._name}get baseUrl(){return this._baseUrl}get isActive(){return this._isActive}set isActive(e){this._isActive=e}getAnimeList(e=!1){return this.cache.animeList.length>0&&!e?(0,r.of)(this.cache.animeList):this._getAnimeList().pipe((0,i.U)(e=>(this.cache.animeList=e,e)))}getAnimeInfo(e){return this._getAnimeInfo(e).pipe((0,i.U)(t=>(t&&(t.link=e),t)))}getEpisodes(e){return this._getEpisodes(e)}getLatestEpisodes(e=!1){return this.cache.latestEpisodes.length>0&&!e?(0,r.of)(this.cache.latestEpisodes):this._getLatestEpisodes().pipe((0,i.U)(e=>{const t=e.map(e=>Object.assign(Object.assign({},e),{anime:Object.assign(Object.assign({},e.anime),{title:e.anime.title.trim()}),fetchingDate:(new Date).getTime(),releaseDate:e.releaseDate||(0,n.Lg)(),hasTemporaryReleaseDate:!e.releaseDate}));return this.cache.latestEpisodes=t,t}))}searchAnime(e){return this._getAnimeList().pipe((0,i.U)(t=>t.filter(t=>-1!==t.title.toLowerCase().indexOf(e.toLowerCase()))||[]))}}{_getAnimeList(e=!1){return(0,r.of)([])}_getAnimeInfo(e){return(0,r.of)()}_getEpisodes(e){return(0,r.of)([])}}class c extends l{constructor(e){super("AddAnime","https://apk.addanime.online"),this.scraper=e,this.filters=Object.assign(Object.assign({},this.filters),{title:e=>e.split("|")[0].trim(),number:e=>{const t=e.match(/(.*) (\d+)/);return(null==t?void 0:t.length)?+t[2]:1},subtitles:e=>"vostar"})}_getLatestEpisodes(){return this.scraper.scrape(`${this.baseUrl}/episode`,"body > .container > .anime-list-content > .row > div",{anime:{title:".anime-card-details > .anime-card-title@title | title",cover:".anime-card-poster img@src"},number:".anime-card-poster .episodes-card-title > h3 > a | number",streamLinks:[{url:".anime-card-poster .episodes-card-title > h3 > a@href",lang:"| subtitles"}]},this.filters)}}class o extends l{constructor(e){super("Anime4up","https://ww.anime4up.com"),this.scraper=e,this.filters=Object.assign(Object.assign({},this.filters),{number:e=>{const t=e.match(/(.*) (\d+)/);return(null==t?void 0:t.length)?+t[2]:1},subtitles:e=>"vostar"})}_getLatestEpisodes(){return this.scraper.scrape(`${this.baseUrl}`,"body > div:nth-child(6).page-content-container .episodes-list-content .episodes-card-container",{anime:{title:".ep-card-anime-title > h3 > a",cover:".episodes-card > div > img@src"},number:".episodes-card-title > h3 > a | number",streamLinks:[{url:".episodes-card > div > a@href | decodeUrl",lang:"| subtitles"}]},this.filters)}}class u extends l{constructor(e){super("ArabAnime","https://www.arabanime.net"),this.scraper=e,this.filters=Object.assign(Object.assign({},this.filters),{number:e=>{const t=e.match(/(.*) (\d+)/);return(null==t?void 0:t.length)?+t[2]:1},subtitles:e=>"vostar"})}_getLatestEpisodes(){return this.scraper.scrape(`${this.baseUrl}`,"section#specials > .container > .row > .col-6",{anime:{title:"a.as-info@title | trim",cover:"img.img-fluid@src"},number:"a.as-info > h3 > span | number",streamLinks:[{url:"a.as-info@href | concatUrl",lang:"| subtitles"}]},this.filters)}}class h extends l{constructor(e){super("OKanime","https://okanime.tv"),this.scraper=e,this.filters=Object.assign(Object.assign({},this.filters),{subtitles:e=>"vostar"})}_getLatestEpisodes(){return this.scraper.scrape(`${this.baseUrl}/dashboard/newest_episodes`,".latest-episodes > div.row > .item",{anime:{title:"span.video-title",cover:".batnie-image img@data-src | concatUrl"},number:"span.video-subtitle span | number",streamLinks:[{url:"a@href | concatUrl",lang:"| subtitles"}]},this.filters)}}class d extends l{constructor(e){super("WitAnime","https://witanime.com"),this.scraper=e,this.filters=Object.assign(Object.assign({},this.filters),{number:e=>{const t=e.match(/(.*) (\d+)/);return(null==t?void 0:t.length)?+t[2]:1},subtitles:e=>"vostar"})}_getLatestEpisodes(){return this.scraper.scrape(`${this.baseUrl}`,"body > div.page-content-container:not(.content) .episodes-list-content .episodes-card-container",{anime:{title:".ep-card-anime-title > h3 > a",cover:".episodes-card > div > img@src"},number:".episodes-card-title > h3 > a | number",streamLinks:[{url:".episodes-card > div > a@href | decodeUrl",lang:"| subtitles"}]},this.filters)}}class p extends l{constructor(e){super("AnimeKisa","https://animekisa.tv"),this.scraper=e,this.filters=Object.assign(Object.assign({},this.filters),{number:e=>{const t=e.match(/Episode (\d+)/);return a((null==t?void 0:t.length)?t[1]:e)},subtitles:e=>"vosten",date:e=>1e3*+e})}_getLatestEpisodes(){return this.scraper.scrape(`${this.baseUrl}`,".listAnimes > div.episode-box",{anime:{title:".title-box > div",cover:".image-box img@src,data-cfsrc | concatUrl"},number:".info-box > div | number",streamLinks:[{url:".episode-box-2 a.an:first-child@href | concatUrl",lang:"| subtitles"}],releaseDate:".info-box > div > time@time | date"},this.filters)}}class m extends l{constructor(e){super("AnimixPlay","https://animixplay.to"),this.scraper=e,this.filters=Object.assign(Object.assign({},this.filters),{number:e=>{const t=e.match(/EP (\d+)/);return a((null==t?void 0:t.length)?t[1]:e)},subtitles:e=>"vosten",date:e=>{var t;if(-1!==e.indexOf("mins ago")||-1!==e.indexOf("hours ago"))return(0,n.Lg)();if(-1!==e.indexOf("1 day ago"))return(0,n.Cv)();{const s=e.match(/(\d+) days ago/);return(null==s?void 0:s.length)?(0,n.m8)(+s[1]):null===(t=new Date(e))||void 0===t?void 0:t.getTime()}}})}_getLatestEpisodes(){return this.scraper.scrape(`${this.baseUrl}`,"#resultplace ul li",{anime:{title:"a .details .name",cover:"a img.resultimg@src"},number:"a .details .infotext | number",streamLinks:[{url:"a@href | concatUrl",lang:"| subtitles"}],releaseDate:"a .timetext | date"},this.filters)}}class g extends l{constructor(e){super("GogoAnime","https://gogoanime.pe"),this.scraper=e,this.filters=Object.assign(Object.assign({},this.filters),{number:e=>{const t=e.match(/Episode (\d+)/);return a((null==t?void 0:t.length)?t[1]:e)},subtitles:e=>-1!==(null==e?void 0:e.indexOf("ic-DUB"))?"dub":"vosten"})}_getLatestEpisodes(){return this.scraper.scrape(`${this.baseUrl}`,".last_episodes ul li",{anime:{title:"p.name a",cover:"div.img img@src"},number:"p.episode | number",streamLinks:[{url:"p.name a@href | concatUrl",lang:".type@class | subtitles"}]},this.filters)}}class f extends l{constructor(e){super("GogoPlay","https://goload.one/"),this.scraper=e,this.filters=Object.assign(Object.assign({},this.filters),{title:e=>{const t=e.match(/(.*) Episode (\d+)/);return(null==t?void 0:t.length)?t[1].trim():e},number:e=>{const t=e.match(/Episode (\d+)/);return a((null==t?void 0:t.length)?t[1]:e)},subtitles:e=>"vosten",date:e=>{var t;if(-1!==e.indexOf("mins ago")||-1!==e.indexOf("hours ago"))return(0,n.Lg)();if(-1!==e.indexOf("1 day ago"))return(0,n.Cv)();{const s=e.match(/(\d+) days ago/);return(null==s?void 0:s.length)?(0,n.m8)(+s[1]):null===(t=new Date(e))||void 0===t?void 0:t.getTime()}}})}_getLatestEpisodes(){return this.scraper.scrape(`${this.baseUrl}`,"ul.listing.items > li",{anime:{title:".name | title",cover:".picture img@src"},number:".name | number",streamLinks:[{url:"a@href | concatUrl",lang:"| subtitles"}],releaseDate:".meta > .date | date"},this.filters)}}class b extends l{constructor(e){super("YugenAnime","https://yugenani.me"),this.scraper=e,this.filters=Object.assign(Object.assign({},this.filters),{cover:e=>{const t=e.trim().match(/this\.src='(.*)'$/i);return(null==t?void 0:t.length)?t[1]:e},number:e=>{const t=e.trim().match(/(\d+) (?:.*)$/i);return a((null==t?void 0:t.length)?t[1]:e)},subtitles:e=>"vosten"})}_getLatestEpisodes(){return this.scraper.scrape(`${this.baseUrl}/latest`,"section ul.ep-grid li.ep-card",{anime:{title:"a.ep-details .ep-origin-name",cover:"a.ep-thumbnail img@onerror,data-src,src | cover"},number:"a.ep-title | number",streamLinks:[{url:"a.ep-thumbnail@href | concatUrl",lang:"| subtitles"}],releaseDate:"a.ep-details .ep-statistics time@datetime | date"},this.filters)}}class v extends l{constructor(e){super("AnimeKo","https://animeko.co"),this.scraper=e,this.filters=Object.assign(Object.assign({},this.filters),{cover:e=>e.replace("/small",""),subtitles:e=>"vostfr",date:e=>{var t;let s=e.toLowerCase();return-1!==s.indexOf("aujourd'hui")?(0,n.Lg)():-1!==s.indexOf("hier")?(0,n.Cv)():(s=s.replace(new RegExp("^("+n.F3.join("|")+")","g"),""),s=s.replace(new RegExp("("+Object.keys(n.ty).join("|")+")","g"),e=>n.ty[e]).trim(),s=s.split(" ").reverse().join("-"),null===(t=new Date(s))||void 0===t?void 0:t.getTime())}})}_getLatestEpisodes(){return this.scraper.scrape(`${this.baseUrl}/dernieres-sorties`,".releases ul li.small-card",{anime:{title:"h2 a",cover:"img@data-src | cover",isNew:".badge-status.new | boolean",isFinished:".badge-status.end | boolean",isMovie:".badge-type.movie | boolean"},number:"span.badge-number | number",streamLinks:[{url:"h2 a@href",lang:"| subtitles"}],releaseDate:":prev div .untitle | date"},this.filters)}}class w extends l{constructor(e){super("AnimeResistance","https://animeresistance.co"),this.scraper=e,this.filters=Object.assign(Object.assign({},this.filters),{number:e=>{const t=e.match(/EP. (\d+)/);return a((null==t?void 0:t.length)?t[1]:e)},subtitles:e=>"vostfr",date:e=>{var t;if(-1!==e.indexOf("minute")||-1!==e.indexOf("heure"))return(0,n.Lg)();if(-1!==e.indexOf("il y a 1 jour"))return(0,n.Cv)();{const s=e.match(/il y a (\d+) jours/);return(null==s?void 0:s.length)?(0,n.m8)(+s[1]):null===(t=new Date(e))||void 0===t?void 0:t.getTime()}}})}_getLatestEpisodes(){return this.scraper.scrape(`${this.baseUrl}`,".container .row .card",{anime:{title:"a.title",cover:"a.thumbnail-link img@src | concatUrl"},number:".number | number",streamLinks:[{url:"a.thumbnail-link@href | concatUrl",lang:"| subtitles"}],releaseDate:".published | date"},this.filters)}}class O extends l{constructor(e){super("JapManga","https://www.japmanga.com"),this.scraper=e,this.filters=Object.assign(Object.assign({},this.filters),{number:e=>{const t=e.replace("Vostfr","").match(/(.*) (\d+)/);return(null==t?void 0:t.length)?+t[2]:1},title:e=>e.replace("Vostfr","").replace(/(.*) (\d+)/,"$1").trim(),subtitles:e=>"vostfr"})}_getLatestEpisodes(){return this.scraper.scrape(`${this.baseUrl}`,"div#anime-pos > .grd-grid > .grd-ceil",{anime:{title:".grd-post-title a | title",cover:".grd-post-thumbnail img@src"},number:".grd-post-title a | number",streamLinks:[{url:".grd-post-thumbnail a@href",lang:"| subtitles"}],releaseDate:".grd-post-date | date"},this.filters)}}class x extends l{constructor(e){super("Mangas-vostfr","https://mangas-vostfr.com"),this.scraper=e,this.filters=Object.assign(Object.assign({},this.filters),{number:e=>{const t=e.replace("Vostfr","").match(/(.*) (\d+)/);return(null==t?void 0:t.length)?+t[2]:1},title:e=>e.replace("Vostfr","").replace(/(.*) (\d+)/,"$1").trim(),subtitles:e=>"vostfr",date:e=>{var t;let s=e.toLowerCase();return s=s.replace(new RegExp("("+Object.keys(n.ty).join("|")+")","g"),e=>n.ty[e]).trim(),s=s.split(" ").reverse().join("-"),null===(t=new Date(s))||void 0===t?void 0:t.getTime()}})}_getLatestEpisodes(){return this.scraper.scrape(`${this.baseUrl}`,"#content_box > article",{anime:{title:"h2.title a | title",cover:".featured-thumbnail img@data-lazy-src,src"},number:"h2.title a | number",streamLinks:[{url:"h2.title a@href",lang:"| subtitles"}],releaseDate:".post-info .date span | date"},this.filters)}}class L extends l{constructor(e){super("MavAnimes","http://www.mavanimes.co"),this.scraper=e,this.filters=Object.assign(Object.assign({},this.filters),{cover:e=>-1!==e.indexOf(",")?e.split(",")[0].replace(/ (\d+\w)$/,""):e.replace("-300x169",""),number:e=>{const t=e.replace("VOSTFR","").match(/(.*) (\d+)/);return(null==t?void 0:t.length)?+t[2]:1},title:e=>e.replace("VOSTFR","").replace(/(.*) (\d+)/,"$1").replace(/ \u2013 $/,""),subtitles:e=>"vostfr"})}_getLatestEpisodes(){return this.scraper.scrape(`${this.baseUrl}`,"div.animes-grid div.grid-item > div",{anime:{title:"p | title",cover:"img.wp-post-image@srcset,src,data-cfsrc | cover"},number:"p | number",streamLinks:[{url:"a@href",lang:"| subtitles"}]},this.filters)}}class y extends l{constructor(e){super("Neko-sama","https://www.neko-sama.fr"),this.scraper=e,this.filters=Object.assign(Object.assign({},this.filters),{number:e=>{const t=e.match(/Ep. (\d+)/);return a((null==t?void 0:t.length)?t[1]:e)},date:e=>{var t;if(-1!==e.indexOf("minute")||-1!==e.indexOf("heure"))return(0,n.Lg)();if(-1!==e.indexOf("il y a 1 jour"))return(0,n.Cv)();{const s=e.match(/il y a (\d+) jours/);return(null==s?void 0:s.length)?(0,n.m8)(+s[1]):null===(t=new Date(e))||void 0===t?void 0:t.getTime()}}})}_getLatestEpisodes(){return this.scraper.getRawHTML(this.baseUrl).pipe((0,i.U)(e=>{const t=e.match(/lastEpisodes = \[(.*)\]/),s=[];if(null==t?void 0:t.length)try{JSON.parse(`[${t[1]}]`).forEach(e=>{s.push({anime:{title:e.title,cover:e.url_image},number:this.filters.number(e.episode),streamLinks:[{url:this.filters.concatUrl(e.url),lang:"vostfr"}],releaseDate:this.filters.date(e.time)})})}catch(r){console.error(r.message)}return s}))}}class j extends l{constructor(e){super("OtakuFr","https://otakufr.co"),this.scraper=e,this.filters=Object.assign(Object.assign({},this.filters),{title:e=>{const t=e.trim().match(/(.*) (\d+) vostfr(?:.*)$/i);return(null==t?void 0:t.length)?t[1].trim():e},number:e=>{const t=e.trim().match(/(\d+) vostfr(?:.*)$/i);return a((null==t?void 0:t.length)?t[1]:e)},subtitles:e=>(null==e?void 0:e.length)?e.toLowerCase().trim():"vostfr",date:e=>{var t;let s=e.toLowerCase();return s=s.replace(new RegExp("^("+n.F3.join("|")+")","g"),""),s=s.replace(new RegExp("("+Object.keys(n.ty).join("|")+")","g"),e=>n.ty[e]).trim(),s=s.split(" ").reverse().join("-"),null===(t=new Date(s))||void 0===t?void 0:t.getTime()}})}_getLatestEpisodes(){return this.scraper.scrape(`${this.baseUrl}`,".section-1 > article.episode",{anime:{title:"a.episode-link | title",cover:"figure img@src"},number:"a.episode-link | number",streamLinks:[{url:"a.episode-link@href",lang:".traduction | subtitles"}],releaseDate:":prev div.title | date"},this.filters)}}class E extends l{constructor(e){super("ToonAnime","https://wvvw.toonanime.tv"),this.scraper=e,this.filters=Object.assign(Object.assign({},this.filters),{title:e=>e.replace(/vostfr/i,"").trim(),number:e=>{const t=e.match(/EP (\d+)/);return a((null==t?void 0:t.length)?t[1]:e)},subtitles:e=>(null==e?void 0:e.length)?e.toLowerCase().trim():"vostfr"})}_getLatestEpisodes(){return this.scraper.scrape(`${this.baseUrl}/anime-vostfr/`,"#dle-content > article",{anime:{title:"footer > div.short__story-title | title",cover:"img@data-src,src | concatUrl"},number:".progress__box > div | number",streamLinks:[{url:"a@href",lang:".label__rate | subtitles"}]},this.filters)}}class k extends l{constructor(e){super("VoirAnime","https://voiranime.com"),this.scraper=e,this.filters=Object.assign(Object.assign({},this.filters),{cover:e=>e.replace("-110x150",""),subtitles:e=>"vostfr",date:e=>{var t;if(-1!==e.indexOf("mins ago")||-1!==e.indexOf("hours ago"))return(0,n.Lg)();if(-1!==e.indexOf("1 day ago"))return(0,n.Cv)();{const s=e.match(/(\d+) days ago/);return(null==s?void 0:s.length)?(0,n.m8)(+s[1]):null===(t=new Date(e))||void 0===t?void 0:t.getTime()}}})}_getLatestEpisodes(){return this.scraper.scrape(`${this.baseUrl}/?filter=subbed`,"#loop-content .page-item-detail",{anime:{title:".post-title h3 a",cover:"img.img-responsive@src | cover"},number:".chapter-item:first-child .chapter a | number",streamLinks:[{url:[".chapter-item:first-child .chapter a@href",".post-title h3 a@href"],lang:"| subtitles"}],releaseDate:".chapter-item:first-child .post-on | date"},this.filters)}}class U extends l{constructor(e){super("VoirAnime.org","https://voiranime.org"),this.scraper=e,this.filters=Object.assign(Object.assign({},this.filters),{title:e=>{const t=e.trim().match(/(.*) (\u2013|\xe9pisode) (\d+) (vostfr|vf)(?:.*)$/i);return(null==t?void 0:t.length)?t[1].trim():e},number:e=>{const t=e.trim().match(/(\d+) (vostfr|vf)(?:.*)$/i);return a((null==t?void 0:t.length)?t[1]:e)},subtitles:e=>{const t=e.trim().match(/(vostfr|vf)(?:.*)$/i);return(null==t?void 0:t.length)?t[1]:"vostfr"}})}_getLatestEpisodes(){return this.scraper.scrape(`${this.baseUrl}`,"#content .video-item",{anime:{title:".item-head > h3 > a | title",cover:".item-thumbnail img@data-src,src"},number:".item-head > h3 > a | number",streamLinks:[{url:".item-head > h3 > a@href",lang:".item-head > h3 > a | subtitles"}]},this.filters)}}class _ extends l{constructor(e){super("VostFree","https://vostfree.com"),this.scraper=e,this.filters=Object.assign(Object.assign({},this.filters),{title:e=>e.replace(/ VOSTFR(?:.*)$/,""),cover:e=>this.filters.concatUrl(e),date:e=>{var t;let s=e.toLowerCase();if(-1!==s.indexOf("aujourd'hui"))return(0,n.Lg)();if(-1!==s.indexOf("hier"))return(0,n.Cv)();{const e=s.split(",");return s=e[0].split("-").reverse().join("-")+e[1],null===(t=new Date(s.replace(",","")))||void 0===t?void 0:t.getTime()}}})}_getLatestEpisodes(){return this.scraper.scrape(`${this.baseUrl}/animes-vostfr`,"#content div.movie-poster",{anime:{title:".info .title | title",cover:".image img@src,data-cfsrc | cover",isNew:".anime-new | boolean",isFinished:".anime-fin | boolean"},number:".alt .year b | number",streamLinks:[{url:".play a.link@href",lang:".quality"}],releaseDate:".info ul.additional li.type:first-child a | date"},this.filters)}}var A=s(4056);class $ extends l{constructor(e){super("WacVostfr","https://wacvostfr.com"),this.scraper=e,this.filters=Object.assign(Object.assign({},this.filters),{title:e=>{const t=e.trim().match(/(.*) (\u2013|\xe9pisode) (\d+) (vostfr|vf)(?:.*)$/i);return(null==t?void 0:t.length)?t[1].trim():e},number:e=>{const t=e.trim().match(/(\d+) (vostfr|vf)(?:.*)$/i);return a((null==t?void 0:t.length)?t[1]:e)},cover:e=>{const t=this.filters.title(e);return this.filters.concatUrl(`/imgs/animes/${(0,A.lV)(t,"-")}.jpg`)},subtitles:e=>{const t=e.trim().match(/(vostfr|vf)(?:.*)$/i);return(null==t?void 0:t.length)?t[1]:"vostfr"}})}_getLatestEpisodes(){return this.scraper.scrape(`${this.baseUrl}`,"#posts-list + .card.mt-4 ul > a",{anime:{title:":self | title",cover:":self | cover"},number:":self | number",streamLinks:[{url:":self@href | concatUrl",lang:":self | subtitles"}]},this.filters)}}var D=s(639),T=s(1456);const S=(()=>{function e(){return Error.call(this),this.message="Timeout has occurred",this.name="TimeoutError",this}return e.prototype=Object.create(Error.prototype),e})();var C=s(5197),F=s(5604);class I{constructor(e,t,s,r){this.waitFor=e,this.absoluteTimeout=t,this.withObservable=s,this.scheduler=r}call(e,t){return t.subscribe(new R(e,this.absoluteTimeout,this.waitFor,this.withObservable,this.scheduler))}}class R extends C.L{constructor(e,t,s,r,i){super(e),this.absoluteTimeout=t,this.waitFor=s,this.withObservable=r,this.scheduler=i,this.action=null,this.scheduleTimeout()}static dispatchTimeout(e){const{withObservable:t}=e;e._unsubscribeAndRecycle(),e.add((0,F.D)(e,t))}scheduleTimeout(){const{action:e}=this;e?this.action=e.schedule(this,this.waitFor):this.add(this.action=this.scheduler.schedule(R.dispatchTimeout,this.waitFor,this))}_next(e){this.absoluteTimeout||this.scheduleTimeout(),super._next(e)}_unsubscribe(){this.action=null,this.scheduler=null,this.withObservable=null}}var P=s(7574);var V=s(5304),M=s(1841),H=s(6622);let N=(()=>{class e{constructor(){this.parser=new DOMParser}fromString(e){return this.parser.parseFromString(e,"text/html")}parse(e,t,s,r){const i=this.fromString(e),n=(0,A.HD)(s);let a=[];return i.querySelectorAll(t).forEach(e=>{if(n)a.push(this.find(e,s,r));else{let t={};Object.keys(s).forEach(i=>{(0,A.HD)(s[i])?t[i]=this.find(e,s[i],r):(0,H.k)(s[i])?(t[i]=[],s[i].forEach(s=>{if((0,A.HD)(s))t[i].push(this.find(e,s,r));else{let n={};Object.keys(s).forEach(t=>{n[t]=this.parseSelector(e,s[t],r)}),t[i].push(n)}})):(t[i]={},Object.keys(s[i]).forEach(n=>{t[i][n]=this.parseSelector(e,s[i][n],r)}))}),a.push(t)}}),a}parseSelector(e,t,s){if(!(0,H.k)(t))return this.find(e,t,s);for(const r of t){const t=this.find(e,r,s);if(t)return t}}find(e,t,s){var r,i,n,a,l,c;const o=t.split("|"),u=o[0].split("@"),h={selector:null===(r=u[0])||void 0===r?void 0:r.trim(),attributes:null===(i=u[1])||void 0===i?void 0:i.trim().split(","),filter:null===(n=o[1])||void 0===n?void 0:n.trim()};let d=null,p="";try{(null===(a=h.selector)||void 0===a?void 0:a.length)&&(d=h.selector.startsWith(":prev ")?this.getPreviousSibling(e,h.selector.replace(":prev ","")):h.selector.startsWith(":next ")?this.getNextSibling(e,h.selector.replace(":next ","")):h.selector.startsWith(":self")?e:e.querySelector(h.selector))}catch(m){console.error(m.message)}return d&&((null===(l=h.attributes)||void 0===l?void 0:l.length)?h.attributes.forEach(e=>{(null==p?void 0:p.length)||(p=d.getAttribute(e))}):p=d.innerHTML),(null===(c=h.filter)||void 0===c?void 0:c.length)&&(null==s?void 0:s[h.filter])&&(p=s[h.filter](p,e)),p}getPreviousSibling(e,t){let s=e.previousElementSibling;if(!t)return s;for(;s;){if(s.matches(t))return s;const e=s.querySelector(t);if(e)return e;s=s.previousElementSibling}return null}getNextSibling(e,t){let s=e.nextElementSibling;if(!t)return s;for(;s;){if(s.matches(t))return s;const e=s.querySelector(t);if(e)return e;s=s.nextElementSibling}return null}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275prov=D.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"}),e})();var G=s(452);let q=(()=>{class e{constructor(e,t,s){this.httpClient=e,this.htmlParser=t,this.settings=s}scrape(e,t,s,r){return this.getRawHTML(e).pipe((0,i.U)(e=>this.htmlParser.parse(e,t,s,r)))}getRawHTML(e,t=3e4){return this.httpClient.get(this.resolveUrl(e),{responseType:"text"}).pipe(function(e,t=T.P){return function(e,t,s=T.P){return r=>{let i=(n=e)instanceof Date&&!isNaN(+n);var n;let a=i?+e-s.now():Math.abs(e);return r.lift(new I(a,i,t,s))}}(e,(s=new S,new P.y(e=>e.error(s))),t);var s}(t),(0,V.K)(e=>(console.error(e.message),(0,r.of)(""))))}resolveUrl(e){var t;return(null===(t=this.settings.proxy)||void 0===t?void 0:t.length)?`${this.settings.proxy}${e}`:e}}return e.\u0275fac=function(t){return new(t||e)(D.LFG(M.eN),D.LFG(N),D.LFG(G.g))},e.\u0275prov=D.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"}),e})(),z=(()=>{class e{constructor(e,t){this.scraper=e,this.settings=t,this.crawlers=[],this.add(new v(this.scraper)),this.add(new y(this.scraper)),this.add(new k(this.scraper)),this.add(new U(this.scraper)),this.add(new L(this.scraper)),this.add(new w(this.scraper)),this.add(new j(this.scraper)),this.add(new _(this.scraper)),this.add(new x(this.scraper)),this.add(new $(this.scraper)),this.add(new O(this.scraper)),this.add(new E(this.scraper)),this.add(new f(this.scraper)),this.add(new p(this.scraper)),this.add(new b(this.scraper)),this.add(new m(this.scraper)),this.add(new g(this.scraper)),this.add(new d(this.scraper)),this.add(new o(this.scraper)),this.add(new u(this.scraper)),this.add(new c(this.scraper)),this.add(new h(this.scraper)),this.update()}update(){this.crawlers.forEach(e=>{e.isActive=-1===this.settings.inactiveCrawlers.indexOf(e.name)})}add(e){this.crawlers.push(e)}remove(e){this.crawlers=this.crawlers.filter(t=>t.name!==e.name)}get(...e){return this.crawlers.filter(t=>-1!==e.indexOf(t.name))}getAll(e=!1){return e&&this.update(),this.crawlers}getAllExcept(...e){return this.crawlers.filter(t=>-1===e.indexOf(t.name))}getActive(e=!1){return e&&this.update(),this.crawlers.filter(e=>e.isActive)}get count(){return this.getAll().length}get activeCount(){return this.getActive().length}}return e.\u0275fac=function(t){return new(t||e)(D.LFG(q),D.LFG(G.g))},e.\u0275prov=D.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"}),e})()}}]);
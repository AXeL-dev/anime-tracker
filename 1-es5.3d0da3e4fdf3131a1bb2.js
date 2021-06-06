function _toConsumableArray(e){return _arrayWithoutHoles(e)||_iterableToArray(e)||_unsupportedIterableToArray(e)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(e,t){if(e){if("string"==typeof e)return _arrayLikeToArray(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?_arrayLikeToArray(e,t):void 0}}function _iterableToArray(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}function _arrayWithoutHoles(e){if(Array.isArray(e))return _arrayLikeToArray(e)}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function _get(e,t,r){return(_get="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,r){var n=_superPropBase(e,t);if(n){var i=Object.getOwnPropertyDescriptor(n,t);return i.get?i.get.call(r):i.value}})(e,t,r||e)}function _superPropBase(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=_getPrototypeOf(e)););return e}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function _createClass(e,t,r){return t&&_defineProperties(e.prototype,t),r&&_defineProperties(e,r),e}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&_setPrototypeOf(e,t)}function _setPrototypeOf(e,t){return(_setPrototypeOf=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function _createSuper(e){var t=_isNativeReflectConstruct();return function(){var r,n=_getPrototypeOf(e);if(t){var i=_getPrototypeOf(this).constructor;r=Reflect.construct(n,arguments,i)}else r=n.apply(this,arguments);return _possibleConstructorReturn(this,r)}}function _possibleConstructorReturn(e,t){return!t||"object"!=typeof t&&"function"!=typeof t?_assertThisInitialized(e):t}function _assertThisInitialized(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function _isNativeReflectConstruct(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}function _getPrototypeOf(e){return(_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{"73Pe":function(e,t,r){"use strict";r.d(t,"c",(function(){return n})),r.d(t,"d",(function(){return i})),r.d(t,"f",(function(){return s})),r.d(t,"b",(function(){return a})),r.d(t,"h",(function(){return c})),r.d(t,"i",(function(){return u})),r.d(t,"a",(function(){return o})),r.d(t,"e",(function(){return l})),r.d(t,"g",(function(){return f}));var n=["lundi","mardi","mercredi","jeudi","vendredi","samedi","dimanche"],i={janvier:1,"f\xe9vrier":2,mars:3,avril:4,mai:5,juin:6,juillet:7,"ao\xfbt":8,septembre:9,octobre:10,novembre:11,"d\xe9cembre":12},s=function(){return new Date},a=function(e){return e.setHours(0,0,0,0)},c=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=s();return e?t.toISOString().slice(0,10):a(t)},u=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return o(1,e)},o=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r=new Date(s().getTime()-864e5*e);return t?r.toISOString().slice(0,10):a(r)},l=function(e){return s().setHours(0,0,0,0)===e.setHours(0,0,0,0)},f=function(e,t){return new Date(e).setHours(0,0,0,0)===new Date(t).setHours(0,0,0,0)}},D0XW:function(e,t,r){"use strict";r.d(t,"a",(function(){return s}));var n=function(e){_inherits(r,e);var t=_createSuper(r);function r(e,n){var i;return _classCallCheck(this,r),(i=t.call(this,e,n)).scheduler=e,i.work=n,i.pending=!1,i}return _createClass(r,[{key:"schedule",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;if(this.closed)return this;this.state=e;var r=this.id,n=this.scheduler;return null!=r&&(this.id=this.recycleAsyncId(n,r,t)),this.pending=!0,this.delay=t,this.id=this.id||this.requestAsyncId(n,this.id,t),this}},{key:"requestAsyncId",value:function(e,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;return setInterval(e.flush.bind(e,this),r)}},{key:"recycleAsyncId",value:function(e,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;if(null!==r&&this.delay===r&&!1===this.pending)return t;clearInterval(t)}},{key:"execute",value:function(e,t){if(this.closed)return new Error("executing a cancelled action");this.pending=!1;var r=this._execute(e,t);if(r)return r;!1===this.pending&&null!=this.id&&(this.id=this.recycleAsyncId(this.scheduler,this.id,null))}},{key:"_execute",value:function(e,t){var r=!1,n=void 0;try{this.work(e)}catch(i){r=!0,n=!!i&&i||new Error(i)}if(r)return this.unsubscribe(),n}},{key:"_unsubscribe",value:function(){var e=this.id,t=this.scheduler,r=t.actions,n=r.indexOf(this);this.work=null,this.state=null,this.pending=!1,this.scheduler=null,-1!==n&&r.splice(n,1),null!=e&&(this.id=this.recycleAsyncId(t,e,null)),this.delay=null}}]),r}(function(e){_inherits(r,e);var t=_createSuper(r);function r(e,n){return _classCallCheck(this,r),t.call(this)}return _createClass(r,[{key:"schedule",value:function(e){arguments.length>1&&void 0!==arguments[1]&&arguments[1];return this}}]),r}(r("quSY").a)),i=function(){var e=function(){function e(t){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:e.now;_classCallCheck(this,e),this.SchedulerAction=t,this.now=r}return _createClass(e,[{key:"schedule",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,r=arguments.length>2?arguments[2]:void 0;return new this.SchedulerAction(this,e).schedule(r,t)}}]),e}();return e.now=function(){return Date.now()},e}(),s=new(function(e){_inherits(r,e);var t=_createSuper(r);function r(e){var n,s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:i.now;return _classCallCheck(this,r),(n=t.call(this,e,(function(){return r.delegate&&r.delegate!==_assertThisInitialized(n)?r.delegate.now():s()}))).actions=[],n.active=!1,n.scheduled=void 0,n}return _createClass(r,[{key:"schedule",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2?arguments[2]:void 0;return r.delegate&&r.delegate!==this?r.delegate.schedule(e,t,n):_get(_getPrototypeOf(r.prototype),"schedule",this).call(this,e,t,n)}},{key:"flush",value:function(e){var t=this.actions;if(this.active)t.push(e);else{var r;this.active=!0;do{if(r=e.execute(e.state,e.delay))break}while(e=t.shift());if(this.active=!1,r){for(;e=t.shift();)e.unsubscribe();throw r}}}}]),r}(i))(n)},Qw5O:function(e,t,r){"use strict";function n(e){return"string"==typeof e||!!e&&"object"==typeof e&&"[object String]"===Object.prototype.toString.call(e)}function i(e,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:.7,n=arguments.length>3&&void 0!==arguments[3]&&arguments[3],i=e.toLowerCase().replace(/[-_~:]/g,""),s=t.toLowerCase().replace(/[-_~:]/g,"");return i===s||!n&&(-1!==i.indexOf(s)||-1!==s.indexOf(i))||function(e,t){var r=e,n=t;e.length<t.length&&(r=t,n=e);var i=r.length;return 0==i?1:(i-function(e,t){e=e.toLowerCase(),t=t.toLowerCase();for(var r=new Array,n=0;n<=e.length;n++){for(var i=n,s=0;s<=t.length;s++)if(0==n)r[s]=s;else if(s>0){var a=r[s-1];e.charAt(n-1)!=t.charAt(s-1)&&(a=Math.min(Math.min(a,i),r[s])+1),r[s-1]=i,i=a}n>0&&(r[t.length]=i)}return r[t.length]}(r,n))/i}(i,s)>=r}r.d(t,"b",(function(){return n})),r.d(t,"a",(function(){return i}))},bYJ0:function(e,t,r){"use strict";r.d(t,"a",(function(){return n})),r.d(t,"b",(function(){return i}));var n=function e(t){for(var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],n=0,s=t.length;n<s;n++){var a=t[n];i(a)?e(a,r):r.push(a)}return r};function i(e){return Array.isArray(e)||e instanceof Array}},cp0P:function(e,t,r){"use strict";r.d(t,"a",(function(){return u}));var n=r("HDdC"),i=r("DH7j"),s=r("lJxs"),a=r("XoHu"),c=r("Cfvw");function u(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];if(1===t.length){var n=t[0];if(Object(i.a)(n))return o(n,null);if(Object(a.a)(n)&&Object.getPrototypeOf(n)===Object.prototype){var c=Object.keys(n);return o(c.map((function(e){return n[e]})),c)}}if("function"==typeof t[t.length-1]){var u=t.pop();return o(t=1===t.length&&Object(i.a)(t[0])?t[0]:t,null).pipe(Object(s.a)((function(e){return u.apply(void 0,_toConsumableArray(e))})))}return o(t,null)}function o(e,t){return new n.a((function(r){var n=e.length;if(0!==n)for(var i=new Array(n),s=0,a=0,u=function(u){var o=Object(c.a)(e[u]),l=!1;r.add(o.subscribe({next:function(e){l||(l=!0,a++),i[u]=e},error:function(e){return r.error(e)},complete:function(){++s!==n&&l||(a===n&&r.next(t?t.reduce((function(e,t,r){return e[t]=i[r],e}),{}):i),r.complete())}}))},o=0;o<n;o++)u(o);else r.complete()}))}},qPbF:function(e,t,r){"use strict";r.d(t,"a",(function(){return $}));var n,i,s,a=r("LRne"),c=r("lJxs"),u=r("73Pe"),o=function(){function e(t,r){var n=this;_classCallCheck(this,e),this.filters={},this.cache={animeList:[],latestEpisodes:[]},this._name=t,this._baseUrl=r,this._isActive=!0,this.filters={number:function(e){return+e},boolean:function(e){return!!(null==e?void 0:e.length)},trim:function(e){return e.trim()},decodeUrl:function(e){return decodeURI(e)},encodeUrl:function(e){return encodeURI(e)},concatUrl:function(e){return"".concat(n.baseUrl.replace(/\/$/,""),"/").concat(null==e?void 0:e.replace(/^\//,""))},today:function(e){return Object(u.h)()}}}return _createClass(e,[{key:"name",get:function(){return this._name}},{key:"baseUrl",get:function(){return this._baseUrl}},{key:"isActive",get:function(){return this._isActive},set:function(e){this._isActive=e}},{key:"getAnimeList",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return this.cache.animeList.length>0&&!t?Object(a.a)(this.cache.animeList):this._getAnimeList().pipe(Object(c.a)((function(t){return e.cache.animeList=t,t})))}},{key:"getAnimeInfo",value:function(e){return this._getAnimeInfo(e).pipe(Object(c.a)((function(t){return t&&(t.link=e),t})))}},{key:"getEpisodes",value:function(e){return this._getEpisodes(e)}},{key:"getLatestEpisodes",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return this.cache.latestEpisodes.length>0&&!t?Object(a.a)(this.cache.latestEpisodes):this._getLatestEpisodes().pipe(Object(c.a)((function(t){var r=t.map((function(e){return Object.assign(Object.assign({},e),{anime:Object.assign(Object.assign({},e.anime),{title:e.anime.title.trim()})})}));return e.cache.latestEpisodes=r,r})))}},{key:"searchAnime",value:function(e){return this._getAnimeList().pipe(Object(c.a)((function(t){return t.filter((function(t){return-1!==t.title.toLowerCase().indexOf(e.toLowerCase())}))||[]})))}}]),e}(),l=function(e){_inherits(r,e);var t=_createSuper(r);function r(e){var n;return _classCallCheck(this,r),(n=t.call(this,"AnimeKo","https://animeko.co")).scraper=e,n.filters=Object.assign(Object.assign({},n.filters),{cover:function(e){return e.replace("/small","")},subtitles:function(e){return"vostfr"},date:function(e){var t,r=e.toLowerCase();return-1!==r.indexOf("aujourd'hui")?Object(u.h)():-1!==r.indexOf("hier")?Object(u.i)():(r=r.replace(new RegExp("^("+u.c.join("|")+")","g"),""),r=r.replace(new RegExp("("+Object.keys(u.d).join("|")+")","g"),(function(e){return u.d[e]})).trim(),r=r.split(" ").reverse().join("-"),null===(t=new Date(r))||void 0===t?void 0:t.getTime())}}),n}return _createClass(r,[{key:"_getAnimeList",value:function(){arguments.length>0&&void 0!==arguments[0]&&arguments[0];return Object(a.a)([])}},{key:"_getAnimeInfo",value:function(e){return Object(a.a)()}},{key:"_getEpisodes",value:function(e){return Object(a.a)([])}},{key:"_getLatestEpisodes",value:function(){return this.scraper.scrape("".concat(this.baseUrl,"/dernieres-sorties"),".releases ul li.small-card",{anime:{title:"h2 a",cover:"img@data-src | cover",isNew:".badge-status.new | boolean",isFinished:".badge-status.end | boolean",isMovie:".badge-type.movie | boolean"},number:"span.badge-number | number",streamLinks:[{url:"h2 a@href",lang:"| subtitles"}],releaseDate:":prev div .untitle | date"},this.filters)}}]),r}(o),f=function(e){_inherits(r,e);var t=_createSuper(r);function r(e){var n;return _classCallCheck(this,r),(n=t.call(this,"AnimeResistance","https://animeresistance.co")).scraper=e,n.filters=Object.assign(Object.assign({},n.filters),{number:function(e){var t=e.match(/EP. (\d+)/);return(null==t?void 0:t.length)?+t[1]:+e},subtitles:function(e){return"vostfr"},date:function(e){var t;if(-1!==e.indexOf("minute")||-1!==e.indexOf("heure"))return Object(u.h)();if(-1!==e.indexOf("il y a 1 jour"))return Object(u.i)();var r=e.match(/il y a (\d+) jours/);return(null==r?void 0:r.length)?Object(u.a)(+r[1]):null===(t=new Date(e))||void 0===t?void 0:t.getTime()}}),n}return _createClass(r,[{key:"_getAnimeList",value:function(){arguments.length>0&&void 0!==arguments[0]&&arguments[0];return Object(a.a)([])}},{key:"_getAnimeInfo",value:function(e){return Object(a.a)()}},{key:"_getEpisodes",value:function(e){return Object(a.a)([])}},{key:"_getLatestEpisodes",value:function(){return this.scraper.scrape("".concat(this.baseUrl),".container .row .card",{anime:{title:"a.title",cover:"a.thumbnail-link img@src | concatUrl"},number:".number | number",streamLinks:[{url:"a.thumbnail-link@href | concatUrl",lang:"| subtitles"}],releaseDate:".published | date"},this.filters)}}]),r}(o),h=function(e){_inherits(r,e);var t=_createSuper(r);function r(e){var n;return _classCallCheck(this,r),(n=t.call(this,"VostFree","https://vostfree.com")).scraper=e,n.filters=Object.assign(Object.assign({},n.filters),{title:function(e){return e.replace(/ VOSTFR(?:.*)$/,"")},cover:function(e){return n.filters.concatUrl(e)},date:function(e){var t,r=e.toLowerCase();if(-1!==r.indexOf("aujourd'hui"))return Object(u.h)();if(-1!==r.indexOf("hier"))return Object(u.i)();var n=r.split(",");return r=n[0].split("-").reverse().join("-")+n[1],null===(t=new Date(r.replace(",","")))||void 0===t?void 0:t.getTime()}}),n}return _createClass(r,[{key:"_getAnimeList",value:function(){arguments.length>0&&void 0!==arguments[0]&&arguments[0];return Object(a.a)([])}},{key:"_getAnimeInfo",value:function(e){return Object(a.a)()}},{key:"_getEpisodes",value:function(e){return Object(a.a)([])}},{key:"_getLatestEpisodes",value:function(){return this.scraper.scrape("".concat(this.baseUrl,"/animes-vostfr"),"#content div.movie-poster",{anime:{title:".info .title | title",cover:".image img@src,data-cfsrc | cover",isNew:".anime-new | boolean",isFinished:".anime-fin | boolean"},number:".alt .year b | number",streamLinks:[{url:".play a.link@href",lang:".quality"}],releaseDate:".info ul.additional li.type:first-child a | date"},this.filters)}}]),r}(o),d=function(e){_inherits(r,e);var t=_createSuper(r);function r(e){var n;return _classCallCheck(this,r),(n=t.call(this,"FullAnimeVF","https://www.fullanimefr.com")).scraper=e,n.filters=Object.assign(Object.assign({},n.filters),{cover:function(e){return e.replace("-218x150","")},number:function(e){var t=e.replace("[NEW]","").replace("[HD]","").replace("VOSTFR","").match(/(.*) Episode (\d+)/);return(null==t?void 0:t.length)?+t[2]:1},isNew:function(e){return-1!==e.indexOf("[NEW]")},isFinished:function(e){return-1!==e.indexOf("[FIN]")},title:function(e){return e.replace("[NEW]","").replace("[HD]","").replace("VOSTFR","").replace(/(.*) Episode (\d+)/,"$1")},subtitles:function(e){return"vostfr"},date:function(e){var t;return null===(t=new Date(e))||void 0===t?void 0:t.getTime()}}),n}return _createClass(r,[{key:"_getAnimeList",value:function(){arguments.length>0&&void 0!==arguments[0]&&arguments[0];return Object(a.a)([])}},{key:"_getAnimeInfo",value:function(e){return Object(a.a)()}},{key:"_getEpisodes",value:function(e){return Object(a.a)([])}},{key:"_getLatestEpisodes",value:function(){return this.scraper.scrape("".concat(this.baseUrl),"div.td-block-span4",{anime:{title:"h3.entry-title a | title",cover:"img.entry-thumb@src,data-cfsrc |\xa0cover",isNew:"h3.entry-title a | isNew",isFinished:"h3.entry-title a | isFinished"},number:"h3.entry-title a | number",streamLinks:[{url:"h3.entry-title a@href",lang:"| subtitles"}],releaseDate:"time.entry-date@datetime | date"},this.filters)}}]),r}(o),v=function(e){_inherits(r,e);var t=_createSuper(r);function r(e){var n;return _classCallCheck(this,r),(n=t.call(this,"VoirAnime","https://voiranime.com")).scraper=e,n.filters=Object.assign(Object.assign({},n.filters),{cover:function(e){return e.replace("-110x150","")},subtitles:function(e){return"vostfr"},date:function(e){var t;if(-1!==e.indexOf("mins ago")||-1!==e.indexOf("hours ago"))return Object(u.h)();if(-1!==e.indexOf("1 day ago"))return Object(u.i)();var r=e.match(/(\d+) days ago/);return(null==r?void 0:r.length)?Object(u.a)(+r[1]):null===(t=new Date(e))||void 0===t?void 0:t.getTime()}}),n}return _createClass(r,[{key:"_getAnimeList",value:function(){arguments.length>0&&void 0!==arguments[0]&&arguments[0];return Object(a.a)([])}},{key:"_getAnimeInfo",value:function(e){return Object(a.a)()}},{key:"_getEpisodes",value:function(e){return Object(a.a)([])}},{key:"_getLatestEpisodes",value:function(){return this.scraper.scrape("".concat(this.baseUrl,"/?filter=subbed"),"#loop-content .page-item-detail",{anime:{title:".post-title h3 a",cover:"img.img-responsive@src |\xa0cover"},number:".chapter-item:first-child .chapter a | number",streamLinks:[{url:".chapter-item:first-child .chapter a@href",lang:"| subtitles"}],releaseDate:".chapter-item:first-child .post-on | date"},this.filters)}}]),r}(o),p=function(e){_inherits(r,e);var t=_createSuper(r);function r(e){var n;return _classCallCheck(this,r),(n=t.call(this,"Neko-sama","https://www.neko-sama.fr")).scraper=e,n.filters=Object.assign(Object.assign({},n.filters),{number:function(e){var t=e.match(/Ep. (\d+)/);return(null==t?void 0:t.length)?+t[1]:+e},date:function(e){var t;if(-1!==e.indexOf("minute")||-1!==e.indexOf("heure"))return Object(u.h)();if(-1!==e.indexOf("il y a 1 jour"))return Object(u.i)();var r=e.match(/il y a (\d+) jours/);return(null==r?void 0:r.length)?Object(u.a)(+r[1]):null===(t=new Date(e))||void 0===t?void 0:t.getTime()}}),n}return _createClass(r,[{key:"_getAnimeList",value:function(){arguments.length>0&&void 0!==arguments[0]&&arguments[0];return Object(a.a)([])}},{key:"_getAnimeInfo",value:function(e){return Object(a.a)()}},{key:"_getEpisodes",value:function(e){return Object(a.a)([])}},{key:"_getLatestEpisodes",value:function(){var e=this;return this.scraper.getRawHTML(this.baseUrl).pipe(Object(c.a)((function(t){var r=t.match(/lastEpisodes = \[(.*)\]/),n=[];if(null==r?void 0:r.length)try{JSON.parse("[".concat(r[1],"]")).forEach((function(t){n.push({anime:{title:t.title,cover:t.url_image},number:e.filters.number(t.episode),streamLinks:[{url:e.filters.concatUrl(t.url),lang:"vostfr"}],releaseDate:e.filters.date(t.time)})}))}catch(i){console.error(i.message)}return n})))}}]),r}(o),g=function(e){_inherits(r,e);var t=_createSuper(r);function r(e){var n;return _classCallCheck(this,r),(n=t.call(this,"JapManga","https://www.japmanga.com")).scraper=e,n.filters=Object.assign(Object.assign({},n.filters),{number:function(e){var t=e.replace("Vostfr","").match(/(.*) (\d+)/);return(null==t?void 0:t.length)?+t[2]:1},title:function(e){return e.replace("Vostfr","").replace(/(.*) (\d+)/,"$1").trim()},subtitles:function(e){return"vostfr"},date:function(e){var t;return null===(t=new Date(e))||void 0===t?void 0:t.getTime()}}),n}return _createClass(r,[{key:"_getAnimeList",value:function(){arguments.length>0&&void 0!==arguments[0]&&arguments[0];return Object(a.a)([])}},{key:"_getAnimeInfo",value:function(e){return Object(a.a)()}},{key:"_getEpisodes",value:function(e){return Object(a.a)([])}},{key:"_getLatestEpisodes",value:function(){return this.scraper.scrape("".concat(this.baseUrl),"div#anime-pos > .grd-grid > .grd-ceil",{anime:{title:".grd-post-title a | title",cover:".grd-post-thumbnail img@src"},number:".grd-post-title a | number",streamLinks:[{url:".grd-post-thumbnail a@href",lang:"| subtitles"}],releaseDate:".grd-post-date | date"},this.filters)}}]),r}(o),b=function(e){_inherits(r,e);var t=_createSuper(r);function r(e){var n;return _classCallCheck(this,r),(n=t.call(this,"Mangas-vostfr","https://www.mangas-vostfr.pro")).scraper=e,n.filters=Object.assign(Object.assign({},n.filters),{number:function(e){var t=e.replace("Vostfr","").match(/(.*) (\d+)/);return(null==t?void 0:t.length)?+t[2]:1},title:function(e){return e.replace("Vostfr","").replace(/(.*) (\d+)/,"$1").trim()},subtitles:function(e){return"vostfr"},date:function(e){var t,r=e.toLowerCase();return r=r.replace(new RegExp("("+Object.keys(u.d).join("|")+")","g"),(function(e){return u.d[e]})).trim(),r=r.split(" ").reverse().join("-"),null===(t=new Date(r))||void 0===t?void 0:t.getTime()}}),n}return _createClass(r,[{key:"_getAnimeList",value:function(){arguments.length>0&&void 0!==arguments[0]&&arguments[0];return Object(a.a)([])}},{key:"_getAnimeInfo",value:function(e){return Object(a.a)()}},{key:"_getEpisodes",value:function(e){return Object(a.a)([])}},{key:"_getLatestEpisodes",value:function(){return this.scraper.scrape("".concat(this.baseUrl),"#content_box > article",{anime:{title:"h2.title a | title",cover:".featured-thumbnail img@src"},number:"h2.title a | number",streamLinks:[{url:"h2.title a@href",lang:"| subtitles"}],releaseDate:".post-info .date span | date"},this.filters)}}]),r}(o),m=function(e){_inherits(r,e);var t=_createSuper(r);function r(e){var n;return _classCallCheck(this,r),(n=t.call(this,"GogoAnime","https://www19.gogoanime.io")).scraper=e,n.filters=Object.assign(Object.assign({},n.filters),{number:function(e){var t=e.match(/Episode (\d+)/);return(null==t?void 0:t.length)?+t[1]:+e},subtitles:function(e){return-1!==(null==e?void 0:e.indexOf("ic-DUB"))?"dub":"vosten"}}),n}return _createClass(r,[{key:"_getAnimeList",value:function(){arguments.length>0&&void 0!==arguments[0]&&arguments[0];return Object(a.a)([])}},{key:"_getAnimeInfo",value:function(e){return Object(a.a)()}},{key:"_getEpisodes",value:function(e){return Object(a.a)([])}},{key:"_getLatestEpisodes",value:function(){return this.scraper.scrape("".concat(this.baseUrl),".last_episodes ul li",{anime:{title:"p.name a",cover:"div.img img@src"},number:"p.episode | number",streamLinks:[{url:"p.name a@href | concatUrl",lang:".type@class | subtitles"}],releaseDate:"| today"},this.filters)}}]),r}(o),y=function(e){_inherits(r,e);var t=_createSuper(r);function r(e){var n;return _classCallCheck(this,r),(n=t.call(this,"4Anime","https://4anime.to")).scraper=e,n.filters=Object.assign(Object.assign({},n.filters),{cover:function(e){return"/"===(null==e?void 0:e[0])?n.filters.concatUrl(e):"".concat(null==e?void 0:e.replace(/^https?:\/\/49.12.133.151/g,n.baseUrl))},number:function(e){var t=e.match(/\d+/g);return(null==t?void 0:t.length)?+t[0]:+e},subtitles:function(e){return"vosten"}}),n}return _createClass(r,[{key:"_getAnimeList",value:function(){arguments.length>0&&void 0!==arguments[0]&&arguments[0];return Object(a.a)([])}},{key:"_getAnimeInfo",value:function(e){return Object(a.a)()}},{key:"_getEpisodes",value:function(e){return Object(a.a)([])}},{key:"_getLatestEpisodes",value:function(){return this.scraper.scrape("".concat(this.baseUrl,"/recently-added"),"#recently-added #headerDIV_2 > div",{anime:{title:"a#headerA_7@alt",cover:"img#headerIMG_6@src | cover"},number:"a#headerA_8 | number",streamLinks:[{url:"a#headerA_5@href",lang:"| subtitles"}],releaseDate:"| today"},this.filters)}}]),r}(o),_=function(e){_inherits(r,e);var t=_createSuper(r);function r(e){var n;return _classCallCheck(this,r),(n=t.call(this,"AnimeKisa","https://animekisa.tv")).scraper=e,n.filters=Object.assign(Object.assign({},n.filters),{number:function(e){var t=e.match(/Episode (\d+)/);return(null==t?void 0:t.length)?+t[1]:+e},subtitles:function(e){return"vosten"},date:function(e){return 1e3*+e}}),n}return _createClass(r,[{key:"_getAnimeList",value:function(){arguments.length>0&&void 0!==arguments[0]&&arguments[0];return Object(a.a)([])}},{key:"_getAnimeInfo",value:function(e){return Object(a.a)()}},{key:"_getEpisodes",value:function(e){return Object(a.a)([])}},{key:"_getLatestEpisodes",value:function(){return this.scraper.scrape("".concat(this.baseUrl),".listAnimes > div.episode-box",{anime:{title:".title-box > div",cover:".image-box img@src,data-cfsrc | concatUrl"},number:".info-box > div | number",streamLinks:[{url:".episode-box-2 a.an:first-child@href | concatUrl",lang:"| subtitles"}],releaseDate:".info-box > div > time@time | date"},this.filters)}}]),r}(o),O=function(e){_inherits(r,e);var t=_createSuper(r);function r(e){var n;return _classCallCheck(this,r),(n=t.call(this,"WitAnime","https://witanime.com")).scraper=e,n.filters=Object.assign(Object.assign({},n.filters),{number:function(e){var t=e.match(/(.*) (\d+)/);return(null==t?void 0:t.length)?+t[2]:1},subtitles:function(e){return"vostar"}}),n}return _createClass(r,[{key:"_getAnimeList",value:function(){arguments.length>0&&void 0!==arguments[0]&&arguments[0];return Object(a.a)([])}},{key:"_getAnimeInfo",value:function(e){return Object(a.a)()}},{key:"_getEpisodes",value:function(e){return Object(a.a)([])}},{key:"_getLatestEpisodes",value:function(){return this.scraper.scrape("".concat(this.baseUrl),"body > div.page-content-container:not(.content) .episodes-list-content .episodes-card-container",{anime:{title:".ep-card-anime-title > h3 > a",cover:".episodes-card > div > img@src"},number:".episodes-card-title > h3 > a | number",streamLinks:[{url:".episodes-card > div > a@href | decodeUrl",lang:"| subtitles"}],releaseDate:"| today"},this.filters)}}]),r}(o),k=function(e){_inherits(r,e);var t=_createSuper(r);function r(e){var n;return _classCallCheck(this,r),(n=t.call(this,"Anime4up","https://ww.anime4up.com")).scraper=e,n.filters=Object.assign(Object.assign({},n.filters),{number:function(e){var t=e.match(/(.*) (\d+)/);return(null==t?void 0:t.length)?+t[2]:1},subtitles:function(e){return"vostar"}}),n}return _createClass(r,[{key:"_getAnimeList",value:function(){arguments.length>0&&void 0!==arguments[0]&&arguments[0];return Object(a.a)([])}},{key:"_getAnimeInfo",value:function(e){return Object(a.a)()}},{key:"_getEpisodes",value:function(e){return Object(a.a)([])}},{key:"_getLatestEpisodes",value:function(){return this.scraper.scrape("".concat(this.baseUrl),"body > div:nth-child(7).page-content-container .episodes-list-content .episodes-card-container",{anime:{title:".ep-card-anime-title > h3 > a",cover:".episodes-card > div > img@src"},number:".episodes-card-title > h3 > a | number",streamLinks:[{url:".episodes-card > div > a@href | decodeUrl",lang:"| subtitles"}],releaseDate:"| today"},this.filters)}}]),r}(o),j=function(e){_inherits(r,e);var t=_createSuper(r);function r(e){var n;return _classCallCheck(this,r),(n=t.call(this,"ToonAnime","https://wvvw.toonanime.co")).scraper=e,n.filters=Object.assign(Object.assign({},n.filters),{title:function(e){return e.replace(/vostfr/i,"").trim()},number:function(e){var t=e.match(/EP (\d+)/);return(null==t?void 0:t.length)?+t[1]:+e},subtitles:function(e){return(null==e?void 0:e.length)?e.toLowerCase().trim():"vostfr"}}),n}return _createClass(r,[{key:"_getAnimeList",value:function(){arguments.length>0&&void 0!==arguments[0]&&arguments[0];return Object(a.a)([])}},{key:"_getAnimeInfo",value:function(e){return Object(a.a)()}},{key:"_getEpisodes",value:function(e){return Object(a.a)([])}},{key:"_getLatestEpisodes",value:function(){return this.scraper.scrape("".concat(this.baseUrl,"/anime-vostfr/"),"#dle-content > article",{anime:{title:"footer > div.short__story-title | title",cover:"img@data-src,src | concatUrl"},number:".progress__box > div | number",streamLinks:[{url:"a@href",lang:".label__rate | subtitles"}],releaseDate:"| today"},this.filters)}}]),r}(o),w=function(e){_inherits(r,e);var t=_createSuper(r);function r(e){var n;return _classCallCheck(this,r),(n=t.call(this,"VoirAnime.org","https://voiranime.org")).scraper=e,n.filters=Object.assign(Object.assign({},n.filters),{title:function(e){var t=e.trim().match(/(.*) (\u2013|\xe9pisode) (\d+) (vostfr|vf)(?:.*)$/i);return(null==t?void 0:t.length)?t[1].trim():e},number:function(e){var t=e.trim().match(/(\d+) (vostfr|vf)(?:.*)$/i);return(null==t?void 0:t.length)?+t[1]:+e},subtitles:function(e){var t=e.trim().match(/(vostfr|vf)(?:.*)$/i);return(null==t?void 0:t.length)?t[1]:"vostfr"}}),n}return _createClass(r,[{key:"_getAnimeList",value:function(){arguments.length>0&&void 0!==arguments[0]&&arguments[0];return Object(a.a)([])}},{key:"_getAnimeInfo",value:function(e){return Object(a.a)()}},{key:"_getEpisodes",value:function(e){return Object(a.a)([])}},{key:"_getLatestEpisodes",value:function(){return this.scraper.scrape("".concat(this.baseUrl),"#content .video-item",{anime:{title:".item-head > h3 > a | title",cover:".item-thumbnail img@data-src,src"},number:".item-head > h3 > a | number",streamLinks:[{url:".item-head > h3 > a@href",lang:".item-head > h3 > a | subtitles"}],releaseDate:"| today"},this.filters)}}]),r}(o),C=function(e){_inherits(r,e);var t=_createSuper(r);function r(e){var n;return _classCallCheck(this,r),(n=t.call(this,"OtakuFr","https://otakufr.co")).scraper=e,n.filters=Object.assign(Object.assign({},n.filters),{title:function(e){var t=e.trim().match(/(.*) (\d+) vostfr(?:.*)$/i);return(null==t?void 0:t.length)?t[1].trim():e},number:function(e){var t=e.trim().match(/(\d+) vostfr(?:.*)$/i);return(null==t?void 0:t.length)?+t[1]:+e},subtitles:function(e){return(null==e?void 0:e.length)?e.toLowerCase().trim():"vostfr"},date:function(e){var t,r=e.toLowerCase();return r=r.replace(new RegExp("^("+u.c.join("|")+")","g"),""),r=r.replace(new RegExp("("+Object.keys(u.d).join("|")+")","g"),(function(e){return u.d[e]})).trim(),r=r.split(" ").reverse().join("-"),null===(t=new Date(r))||void 0===t?void 0:t.getTime()}}),n}return _createClass(r,[{key:"_getAnimeList",value:function(){arguments.length>0&&void 0!==arguments[0]&&arguments[0];return Object(a.a)([])}},{key:"_getAnimeInfo",value:function(e){return Object(a.a)()}},{key:"_getEpisodes",value:function(e){return Object(a.a)([])}},{key:"_getLatestEpisodes",value:function(){return this.scraper.scrape("".concat(this.baseUrl),".section-1 > article.episode",{anime:{title:"a.episode-link | title",cover:"figure img@src"},number:"a.episode-link | number",streamLinks:[{url:"a.episode-link@href",lang:".traduction | subtitles"}],releaseDate:":prev div.title | date"},this.filters)}}]),r}(o),A=function(e){_inherits(r,e);var t=_createSuper(r);function r(e){var n;return _classCallCheck(this,r),(n=t.call(this,"MavAnimes","http://www.mavanimes.co")).scraper=e,n.filters=Object.assign(Object.assign({},n.filters),{cover:function(e){return e.replace("-300x169","")},number:function(e){var t=e.replace("VOSTFR","").match(/(.*) (\d+)/);return(null==t?void 0:t.length)?+t[2]:1},title:function(e){return e.replace("VOSTFR","").replace(/(.*) (\d+)/,"$1")},subtitles:function(e){return"vostfr"}}),n}return _createClass(r,[{key:"_getAnimeList",value:function(){arguments.length>0&&void 0!==arguments[0]&&arguments[0];return Object(a.a)([])}},{key:"_getAnimeInfo",value:function(e){return Object(a.a)()}},{key:"_getEpisodes",value:function(e){return Object(a.a)([])}},{key:"_getLatestEpisodes",value:function(){return this.scraper.scrape("".concat(this.baseUrl),"div.animes-grid div.grid-item > div",{anime:{title:"p | title",cover:"img.wp-post-image@src,src-set,data-cfsrc |\xa0cover"},number:"p | number",streamLinks:[{url:"a@href",lang:"| subtitles"}],releaseDate:"| today"},this.filters)}}]),r}(o),L=r("fXoL"),E=r("D0XW"),x=function(){function e(){return Error.call(this),this.message="Timeout has occurred",this.name="TimeoutError",this}return e.prototype=Object.create(Error.prototype),e}(),S=r("l7GE"),T=r("ZUHj"),I=function(){function e(t,r,n,i){_classCallCheck(this,e),this.waitFor=t,this.absoluteTimeout=r,this.withObservable=n,this.scheduler=i}return _createClass(e,[{key:"call",value:function(e,t){return t.subscribe(new D(e,this.absoluteTimeout,this.waitFor,this.withObservable,this.scheduler))}}]),e}(),D=function(e){_inherits(r,e);var t=_createSuper(r);function r(e,n,i,s,a){var c;return _classCallCheck(this,r),(c=t.call(this,e)).absoluteTimeout=n,c.waitFor=i,c.withObservable=s,c.scheduler=a,c.action=null,c.scheduleTimeout(),c}return _createClass(r,[{key:"scheduleTimeout",value:function(){var e=this.action;e?this.action=e.schedule(this,this.waitFor):this.add(this.action=this.scheduler.schedule(r.dispatchTimeout,this.waitFor,this))}},{key:"_next",value:function(e){this.absoluteTimeout||this.scheduleTimeout(),_get(_getPrototypeOf(r.prototype),"_next",this).call(this,e)}},{key:"_unsubscribe",value:function(){this.action=null,this.scheduler=null,this.withObservable=null}}],[{key:"dispatchTimeout",value:function(e){var t=e.withObservable;e._unsubscribeAndRecycle(),e.add(Object(T.a)(e,t))}}]),r}(S.a),U=r("HDdC"),P=r("JIr8"),R=r("tk/3"),F=r("Qw5O"),H=r("bYJ0"),N=((n=function(){function e(){_classCallCheck(this,e),this.parser=new DOMParser}return _createClass(e,[{key:"fromString",value:function(e){return this.parser.parseFromString(e,"text/html")}},{key:"parse",value:function(e,t,r,n){var i=this,s=this.fromString(e),a=Object(F.b)(r),c=[];return s.querySelectorAll(t).forEach((function(e){if(a)c.push(i.find(e,r,n));else{var t={};Object.keys(r).forEach((function(s){Object(F.b)(r[s])?t[s]=i.find(e,r[s],n):Object(H.b)(r[s])?(t[s]=[],r[s].forEach((function(r){if(Object(F.b)(r))t[s].push(i.find(e,r,n));else{var a={};Object.keys(r).forEach((function(t){a[t]=i.find(e,r[t],n)})),t[s].push(a)}}))):(t[s]={},Object.keys(r[s]).forEach((function(a){t[s][a]=i.find(e,r[s][a],n)})))})),c.push(t)}})),c}},{key:"find",value:function(e,t,r){var n,i,s,a,c,u,o=t.split("|"),l=o[0].split("@"),f={selector:null===(n=l[0])||void 0===n?void 0:n.trim(),attributes:null===(i=l[1])||void 0===i?void 0:i.trim().split(","),filter:null===(s=o[1])||void 0===s?void 0:s.trim()},h=null,d="";try{(null===(a=f.selector)||void 0===a?void 0:a.length)&&(h=f.selector.startsWith(":prev ")?this.getPreviousSibling(e,f.selector.replace(":prev ","")):f.selector.startsWith(":next ")?this.getNextSibling(e,f.selector.replace(":next ","")):e.querySelector(f.selector))}catch(v){console.error(v.message)}return h&&((null===(c=f.attributes)||void 0===c?void 0:c.length)?f.attributes.forEach((function(e){(null==d?void 0:d.length)||(d=h.getAttribute(e))})):d=h.innerHTML),(null===(u=f.filter)||void 0===u?void 0:u.length)&&(null==r?void 0:r[f.filter])&&(d=r[f.filter](d,e)),d}},{key:"getPreviousSibling",value:function(e,t){var r=e.previousElementSibling;if(!t)return r;for(;r;){if(r.matches(t))return r;var n=r.querySelector(t);if(n)return n;r=r.previousElementSibling}return null}},{key:"getNextSibling",value:function(e,t){var r=e.nextElementSibling;if(!t)return r;for(;r;){if(r.matches(t))return r;var n=r.querySelector(t);if(n)return n;r=r.nextElementSibling}return null}}]),e}()).\u0275fac=function(e){return new(e||n)},n.\u0275prov=L.Tb({token:n,factory:n.\u0275fac,providedIn:"root"}),n),M=r("6nr9"),V=((s=function(){function e(t,r,n){_classCallCheck(this,e),this.httpClient=t,this.htmlParser=r,this.settings=n}return _createClass(e,[{key:"scrape",value:function(e,t,r,n){var i=this;return this.getRawHTML(e).pipe(Object(c.a)((function(e){return i.htmlParser.parse(e,t,r,n)})))}},{key:"getRawHTML",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:3e4;return this.httpClient.get(this.resolveUrl(e),{responseType:"text"}).pipe(function(e){var t,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:E.a;return function(e,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:E.a;return function(n){var i,s=(i=e)instanceof Date&&!isNaN(+i),a=s?+e-r.now():Math.abs(e);return n.lift(new I(a,s,t,r))}}(e,(t=new x,new U.a((function(e){return e.error(t)}))),r)}(t),Object(P.a)((function(e){return console.error(e.message),Object(a.a)("")})))}},{key:"resolveUrl",value:function(e){var t;return(null===(t=this.settings.proxy)||void 0===t?void 0:t.length)?"".concat(this.settings.proxy).concat(e):e}}]),e}()).\u0275fac=function(e){return new(e||s)(L.hc(R.a),L.hc(N),L.hc(M.a))},s.\u0275prov=L.Tb({token:s,factory:s.\u0275fac,providedIn:"root"}),s),$=((i=function(){function e(t,r){_classCallCheck(this,e),this.scraper=t,this.settings=r,this.crawlers=[],this.add(new l(this.scraper)),this.add(new p(this.scraper)),this.add(new v(this.scraper)),this.add(new w(this.scraper)),this.add(new A(this.scraper)),this.add(new f(this.scraper)),this.add(new h(this.scraper)),this.add(new d(this.scraper)),this.add(new b(this.scraper)),this.add(new C(this.scraper)),this.add(new g(this.scraper)),this.add(new j(this.scraper)),this.add(new m(this.scraper)),this.add(new y(this.scraper)),this.add(new _(this.scraper)),this.add(new O(this.scraper)),this.add(new k(this.scraper)),this.update()}return _createClass(e,[{key:"update",value:function(){var e=this;this.crawlers.forEach((function(t){t.isActive=-1===e.settings.inactiveCrawlers.indexOf(t.name)}))}},{key:"add",value:function(e){this.crawlers.push(e)}},{key:"remove",value:function(e){this.crawlers=this.crawlers.filter((function(t){return t.name!==e.name}))}},{key:"get",value:function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return this.crawlers.filter((function(e){return-1!==t.indexOf(e.name)}))}},{key:"getAll",value:function(){return this.crawlers}},{key:"getAllExcept",value:function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return this.crawlers.filter((function(e){return-1===t.indexOf(e.name)}))}},{key:"getActive",value:function(){return this.crawlers.filter((function(e){return e.isActive}))}}]),e}()).\u0275fac=function(e){return new(e||i)(L.hc(V),L.hc(M.a))},i.\u0275prov=L.Tb({token:i,factory:i.\u0275fac,providedIn:"root"}),i)}}]);
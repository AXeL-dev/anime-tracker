(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{KWWs:function(e,t,i){"use strict";i.d(t,"a",(function(){return d}));var s=i("mrSG"),n=i("ioN6"),r=i("73Pe"),o=i("fXoL"),a=i("tQGB"),c=i("tyNb");let d=(()=>{class e{constructor(e,t){this.browser=e,this.router=t,this.notifications=[],this.canSendMessage=!1,this.canUpdateBackgroundNotifications=!0,this.canSendMessage=this.browser.isWebExtension&&"/background"!==this.router.url,this.canSendMessage&&this.fetchFromBackgroundScript(),this.listenToConsole()}fetchFromBackgroundScript(){return Object(s.a)(this,void 0,void 0,(function*(){const e=yield this.browser.sendMessage("getNotifications");(null==e?void 0:e.length)&&(this.notifications=[...e])}))}listenToConsole(){const e=console.error;console.error=(t,...i)=>{this.push(t,n.b.Error),e(t,...i)}}push(e,t=n.b.Info){this.notifications.unshift({message:e,type:t,date:Object(r.f)(),status:n.a.Unread})}get(){return this.notifications}markAllAsRead(){return this.canSendMessage&&this.canUpdateBackgroundNotifications&&(this.browser.sendMessage("markNotificationsAsRead"),this.canUpdateBackgroundNotifications=!1),this.notifications.forEach(e=>{e.status=n.a.Read}),this.notifications}hasUnread(){return this.notifications.filter(e=>!e.status||e.status===n.a.Unread).length>0}}return e.\u0275fac=function(t){return new(t||e)(o.hc(a.a),o.hc(c.c))},e.\u0275prov=o.Tb({token:e,factory:e.\u0275fac,providedIn:"root"}),e})()},RKI1:function(e,t,i){"use strict";i.d(t,"a",(function(){return y}));var s=i("bYJ0"),n=i("Qw5O"),r=i("cp0P"),o=i("GyhO"),a=i("HDdC"),c=i("D0XW"),d=i("DH7j");function u(e){return!Object(d.a)(e)&&e-parseFloat(e)+1>=0}var h=i("z+Ro");function l(e){const{index:t,period:i,subscriber:s}=e;if(s.next(t),!s.closed){if(-1===i)return s.complete();e.index=t+1,this.schedule(e,i)}}var v=i("lJxs"),f=i("bOdf"),g=i("7o/Q");class b{constructor(e,t){this.predicate=e,this.inclusive=t}call(e,t){return t.subscribe(new p(e,this.predicate,this.inclusive))}}class p extends g.a{constructor(e,t,i){super(e),this.predicate=t,this.inclusive=i,this.index=0}_next(e){const t=this.destination;let i;try{i=this.predicate(e,this.index++)}catch(s){return void t.error(s)}this.nextOrComplete(e,i)}nextOrComplete(e,t){const i=this.destination;Boolean(t)?i.next(e):(this.inclusive&&i.next(e),i.complete())}}var m=i("73Pe"),w=i("fXoL"),O=i("qPbF"),k=i("6nr9"),j=i("cqYI");let y=(()=>{class e{constructor(e,t,i){this.crawlers=e,this.settings=t,this.debug=i}search(e){const t=this.crawlers.getActive();return Object(r.a)(...t.map(t=>t.searchAnime(e))).pipe(Object(v.a)(e=>Object(s.a)(e)))}getLatestEpisodes(e=!1){const t=this.crawlers.getActive();return Object(r.a)(...t.map(t=>t.getLatestEpisodes(e))).pipe(Object(v.a)(e=>{const t=Object(s.a)(e.map(e=>e.slice(0,Math.min(e.length,this.settings.maxEpisodesToRetrieve))));return this.debug.log("All latest episodes:",t),this.debug.log("--------------------------"),this.mergeEpisodes(t)}))}getLatestEpisodesByDays(e=!1,t=50){const i=this.crawlers.getActive();let s=[],n=0;return t||(t=this.settings.maxEpisodesToRetrieve),Object(o.a)(...i.map(t=>t.getLatestEpisodes(e))).pipe(Object(f.a)((e,r)=>{const o=e.slice(0,Math.min(e.length,this.settings.maxEpisodesToRetrieve));this.debug.log(`${i[r].name} latest episodes:`,o),this.debug.log("--------------------------"),s=this.mergeEpisodes(o,s);let d=!0;return function(e=0,t,i){let s=-1;return u(t)?s=Number(t)<1?1:Number(t):Object(h.a)(t)&&(i=t),Object(h.a)(i)||(i=c.a),new a.a(t=>{const n=u(e)?e:+e-i.now();return i.schedule(l,n,{index:0,period:s,subscriber:t})})}(100,500).pipe(function(e,t=!1){return i=>i.lift(new b(e,t))}(()=>d),Object(v.a)(e=>{let i=e*t+n+t;i>=s.length&&(i=s.length,n=i,d=!1);const r=s.slice(0,i),o=this.settings.displayEpisodesDayByDay?this.getEpisodesDays(r):[];return this.debug.log("Slice",e,":",r),this.debug.log("Days:",o),this.debug.log("----------------------------"),[r,o]}))}))}mergeEpisodes(e,t=[]){return e.forEach(e=>{var i,s;let r=0;for(let o of t){if(Object(n.a)(o.anime.title,e.anime.title)&&o.number===e.number)return t[r].releaseDate||(t[r].releaseDate=e.releaseDate),(null===(i=e.streamLinks)||void 0===i?void 0:i.length)&&(t[r].streamLinks=[...t[r].streamLinks,...e.streamLinks]),(null===(s=e.downloadLinks)||void 0===s?void 0:s.length)&&(t[r].downloadLinks=[...t[r].downloadLinks,...e.downloadLinks]),e.anime.isNew&&!t[r].anime.isNew&&(t[r].anime.isNew=e.anime.isNew),void(e.anime.isFinished&&!t[r].anime.isFinished&&(t[r].anime.isFinished=e.anime.isFinished));r++}t.push(Object.assign(Object.assign({},e),{streamLinks:e.streamLinks||[],downloadLinks:e.downloadLinks||[]}))}),t.length&&(t=t.sort((e,t)=>t.releaseDate-e.releaseDate)),t}getEpisodesDays(e){let t=[];return e.forEach(e=>{if(e.releaseDate){const i=Object(m.b)(new Date(e.releaseDate));-1===t.indexOf(i)&&t.push(i)}}),t}}return e.\u0275fac=function(t){return new(t||e)(w.hc(O.a),w.hc(k.a),w.hc(j.a))},e.\u0275prov=w.Tb({token:e,factory:e.\u0275fac,providedIn:"root"}),e})()},XPoy:function(e,t,i){"use strict";i.d(t,"a",(function(){return c}));var s=i("mrSG"),n=i("Qw5O"),r=i("fXoL"),o=i("n90K"),a=i("tQGB");let c=(()=>{class e{constructor(e,t){this.storage=e,this.browser=t,this.init()}init(){return Object(s.a)(this,void 0,void 0,(function*(){this.viewed=yield this.getAsync(!0),this.url=this.browser.getUrl("viewed")}))}getAsync(e){var t;return Object(s.a)(this,void 0,void 0,(function*(){if((null===(t=this.viewed)||void 0===t?void 0:t.length)&&!e)return this.viewed;{const e=yield this.storage.get("viewed");return(null==e?void 0:e.length)?e:[]}}))}save(){this.storage.save("viewed",this.viewed)}get(){return this.viewed}add(e){this.isViewed(e)||(this.viewed.push({animeTitle:e.anime.title,number:e.number}),this.save())}remove(e){var t,i;const s=null===(t=this.viewed)||void 0===t?void 0:t.filter(t=>!(Object(n.a)(t.animeTitle,e.anime.title,.9,!0)&&t.number===e.number));(null==s?void 0:s.length)<(null===(i=this.viewed)||void 0===i?void 0:i.length)&&(this.viewed=s,this.save())}isViewed(e){var t;return!!(null===(t=this.viewed)||void 0===t?void 0:t.find(t=>Object(n.a)(t.animeTitle,e.anime.title,.9,!0)&&t.number===e.number))}isRegular(e){var t;return!!(null===(t=this.viewed)||void 0===t?void 0:t.find(t=>Object(n.a)(t.animeTitle,e.anime.title,.7)))}refresh(){return this.init()}getEpisodeUrl(e){return`${this.url}/${e.anime.title}`}}return e.\u0275fac=function(t){return new(t||e)(r.hc(o.a),r.hc(a.a))},e.\u0275prov=r.Tb({token:e,factory:e.\u0275fac,providedIn:"root"}),e})()},ioN6:function(e,t,i){"use strict";i.d(t,"b",(function(){return s})),i.d(t,"a",(function(){return n}));var s=function(e){return e.Success="success",e.Info="info",e.Error="error",e}({}),n=function(e){return e.Read="read",e.Unread="unread",e}({})},vKPz:function(e,t,i){"use strict";i.d(t,"a",(function(){return o}));var s=i("mrSG"),n=i("fXoL"),r=i("n90K");let o=(()=>{class e{constructor(e){this.storage=e,this.init()}init(){return Object(s.a)(this,void 0,void 0,(function*(){const e=yield this.storage.get("favorites");this.favorites=(null==e?void 0:e.length)?e:[]}))}save(){this.storage.save("favorites",this.favorites)}get(){return this.favorites}add(e){this.isFavorite(e)||(this.favorites.push(e),this.save())}remove(e){const t=this.getIndexOf(e);-1!==t&&(this.favorites.splice(t,1),this.save())}isFavorite(e){return-1!==this.getIndexOf(e)}getIndexOf(e){var t;return null===(t=this.favorites)||void 0===t?void 0:t.indexOf(e)}refresh(){return this.init()}}return e.\u0275fac=function(t){return new(t||e)(n.hc(r.a))},e.\u0275prov=n.Tb({token:e,factory:e.\u0275fac,providedIn:"root"}),e})()}}]);
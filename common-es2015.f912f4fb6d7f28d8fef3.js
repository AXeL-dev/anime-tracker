(self.webpackChunkanime_tracker=self.webpackChunkanime_tracker||[]).push([[592],{5360:function(e,t,i){"use strict";i.d(t,{k:function(){return s},E:function(){return n}});var s=(()=>(function(e){e.Success="success",e.Info="info",e.Error="error"}(s||(s={})),s))(),n=(()=>(function(e){e.Read="read",e.Unread="unread"}(n||(n={})),n))()},961:function(e,t,i){"use strict";i.d(t,{_:function(){return E}});var s=i(6622),n=i(5427),r=i(4056),o=i(7574),a=i(1456),d=i(9796);function c(e){return!(0,d.k)(e)&&e-parseFloat(e)+1>=0}var u=i(4869);function h(e){const{index:t,period:i,subscriber:s}=e;if(s.next(t),!s.closed){if(-1===i)return s.complete();e.index=t+1,this.schedule(e,i)}}var l=i(5758),v=i(8071),g=i(7393);class f{constructor(e,t){this.predicate=e,this.inclusive=t}call(e,t){return t.subscribe(new p(e,this.predicate,this.inclusive))}}class p extends g.L{constructor(e,t,i){super(e),this.predicate=t,this.inclusive=i,this.index=0}_next(e){const t=this.destination;let i;try{i=this.predicate(e,this.index++)}catch(s){return void t.error(s)}this.nextOrComplete(e,i)}nextOrComplete(e,t){const i=this.destination;Boolean(t)?i.next(e):(this.inclusive&&i.next(e),i.complete())}}var m=i(8002),w=i(4612),b=i(3470),k=i(639),y=i(5923),L=i(452),D=i(3631);let E=(()=>{class e{constructor(e,t,i){this.crawlers=e,this.settings=t,this.debug=i}search(e){const t=this.crawlers.getActive();return(0,l.D)(t.map(t=>t.searchAnime(e))).pipe((0,m.U)(e=>(0,s.x)(e)))}getLatestEpisodes(e=!1){const t=this.crawlers.getActive(e);return(0,l.D)(t.map(t=>t.getLatestEpisodes(e))).pipe((0,m.U)(e=>{const t=(0,s.x)(e.map(e=>e.slice(0,Math.min(e.length,this.settings.maxEpisodesToRetrieve))));return this.debug.log("All latest episodes:",t),this.debug.log("--------------------------"),this.mergeEpisodes(t)}))}getLatestEpisodesByDays(e=!1,t=50){const i=this.crawlers.getActive(e);let s=[],n=0;return t||(t=this.settings.maxEpisodesToRetrieve),(0,v.z)(...i.map(t=>t.getLatestEpisodes(e))).pipe((0,w.b)((e,r)=>{const d=e.slice(0,Math.min(e.length,this.settings.maxEpisodesToRetrieve));this.debug.log(`${i[r].name} latest episodes:`,d),this.debug.log("--------------------------"),s=this.mergeEpisodes(d,s);let l=!0;return function(e=0,t,i){let s=-1;return c(t)?s=Number(t)<1?1:Number(t):(0,u.K)(t)&&(i=t),(0,u.K)(i)||(i=a.P),new o.y(t=>{const n=c(e)?e:+e-i.now();return i.schedule(h,n,{index:0,period:s,subscriber:t})})}(100,500).pipe(function(e,t=!1){return i=>i.lift(new f(e,t))}(()=>l),(0,m.U)(e=>{let i=e*t+n+t;i>=s.length&&(i=s.length,n=i,l=!1);const r=s.slice(0,i),o=this.settings.displayEpisodesDayByDay?this.getEpisodesDays(r):[];return this.debug.log("Slice",e,":",r),this.debug.log("Days:",o),this.debug.log("----------------------------"),[r,o]}))}))}mergeEpisodes(e,t=[]){return e.forEach(e=>{var i,s;let n=0;for(let o of t){if((0,r.T0)(o.anime.title,e.anime.title,this.settings.episodeSimilarityDegree)&&o.number===e.number)return t[n].releaseDate&&!t[n].hasTemporaryReleaseDate||(t[n].releaseDate=e.releaseDate,t[n].hasTemporaryReleaseDate=!1),(null===(i=e.streamLinks)||void 0===i?void 0:i.length)&&(t[n].streamLinks=[...t[n].streamLinks,...e.streamLinks]),(null===(s=e.downloadLinks)||void 0===s?void 0:s.length)&&(t[n].downloadLinks=[...t[n].downloadLinks,...e.downloadLinks]),e.anime.isNew&&!t[n].anime.isNew&&(t[n].anime.isNew=e.anime.isNew),void(e.anime.isFinished&&!t[n].anime.isFinished&&(t[n].anime.isFinished=e.anime.isFinished));n++}t.push(Object.assign(Object.assign({},e),{streamLinks:e.streamLinks||[],downloadLinks:e.downloadLinks||[]}))}),t.length&&(t=t.sort((e,t)=>this.settings.sortEpisodesBy===n.q.FetchingDate&&(0,b.zu)(e.releaseDate,t.releaseDate)?e.fetchingDate-t.fetchingDate:t.releaseDate-e.releaseDate)),t}getEpisodesDays(e){let t=[];return e.forEach(e=>{if(e.releaseDate){const i=(0,b.hp)(new Date(e.releaseDate));-1===t.indexOf(i)&&t.push(i)}}),t}}return e.\u0275fac=function(t){return new(t||e)(k.LFG(y.K),k.LFG(L.g),k.LFG(D.r))},e.\u0275prov=k.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"}),e})()},8604:function(e,t,i){"use strict";i.d(t,{S:function(){return o}});var s=i(4762),n=i(639),r=i(1188);let o=(()=>{class e{constructor(e){this.storage=e,this.init()}init(){return(0,s.mG)(this,void 0,void 0,function*(){const e=yield this.storage.get("favorites");this.favorites=(null==e?void 0:e.length)?e:[]})}save(){this.storage.save("favorites",this.favorites)}get(){return this.favorites}add(e){this.isFavorite(e)||(this.favorites.push(e),this.save())}remove(e){const t=this.getIndexOf(e);-1!==t&&(this.favorites.splice(t,1),this.save())}isFavorite(e){return-1!==this.getIndexOf(e)}getIndexOf(e){var t;return null===(t=this.favorites)||void 0===t?void 0:t.indexOf(e)}refresh(){return this.init()}}return e.\u0275fac=function(t){return new(t||e)(n.LFG(r.V))},e.\u0275prov=n.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"}),e})()},9744:function(e,t,i){"use strict";i.d(t,{T:function(){return c}});var s=i(4762),n=i(5360),r=i(3470),o=i(639),a=i(4071),d=i(5263);let c=(()=>{class e{constructor(e,t){this.browser=e,this.router=t,this.notifications=[],this.canSendMessage=!1,this.canUpdateBackgroundNotifications=!0,this.canSendMessage=this.browser.isWebExtension&&"/background"!==this.router.url,this.canSendMessage&&this.fetchFromBackgroundScript(),this.listenToConsole()}fetchFromBackgroundScript(){return(0,s.mG)(this,void 0,void 0,function*(){const e=yield this.browser.sendMessage("getNotifications");(null==e?void 0:e.length)&&(this.notifications=[...e])})}listenToConsole(){const e=console.error;console.error=(t,...i)=>{this.push(t,n.k.Error),e(t,...i)}}push(e,t=n.k.Info){this.notifications.unshift({message:e,type:t,date:(0,r.zO)(),status:n.E.Unread})}get(){return this.notifications}markAllAsRead(){return this.canSendMessage&&this.canUpdateBackgroundNotifications&&(this.browser.sendMessage("markNotificationsAsRead"),this.canUpdateBackgroundNotifications=!1),this.notifications.forEach(e=>{e.status=n.E.Read}),this.notifications}get unreadCount(){return this.notifications.filter(e=>!e.status||e.status===n.E.Unread).length}hasUnread(){return this.unreadCount>0}}return e.\u0275fac=function(t){return new(t||e)(o.LFG(a.q),o.LFG(d.F0))},e.\u0275prov=o.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"}),e})()},1942:function(e,t,i){"use strict";i.d(t,{z:function(){return c}});var s=i(4762),n=i(4056),r=i(639),o=i(1188),a=i(452),d=i(4071);let c=(()=>{class e{constructor(e,t,i){this.storage=e,this.settings=t,this.browser=i,this.init()}init(){return(0,s.mG)(this,void 0,void 0,function*(){this.viewed=yield this.getAsync(!0),this.url=this.browser.getUrl("viewed")})}getAsync(e){var t;return(0,s.mG)(this,void 0,void 0,function*(){if((null===(t=this.viewed)||void 0===t?void 0:t.length)&&!e)return this.viewed;{const e=yield this.storage.get("viewed");return(null==e?void 0:e.length)?e:[]}})}save(){this.storage.save("viewed",this.viewed)}get(){return this.viewed}add(e){this.isViewed(e)||(this.viewed.push({animeTitle:e.anime.title,number:e.number}),this.save())}remove(e){var t,i;const s=null===(t=this.viewed)||void 0===t?void 0:t.filter(t=>!((0,n.T0)(t.animeTitle,e.anime.title,.9,!0)&&t.number===e.number));(null==s?void 0:s.length)<(null===(i=this.viewed)||void 0===i?void 0:i.length)&&(this.viewed=s,this.save())}isViewed(e){var t;return!!(null===(t=this.viewed)||void 0===t?void 0:t.find(t=>(0,n.T0)(t.animeTitle,e.anime.title,.9,!0)&&t.number===e.number))}isRegular(e){var t;return!!(null===(t=this.viewed)||void 0===t?void 0:t.find(t=>(0,n.T0)(t.animeTitle,e.anime.title,this.settings.episodeSimilarityDegree)))}refresh(){return this.init()}getEpisodeUrl(e){return`${this.url}/${e.anime.title}`}}return e.\u0275fac=function(t){return new(t||e)(r.LFG(o.V),r.LFG(a.g),r.LFG(d.q))},e.\u0275prov=r.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"}),e})()}}]);
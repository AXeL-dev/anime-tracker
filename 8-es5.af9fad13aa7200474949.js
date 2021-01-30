function _slicedToArray(e,t){return _arrayWithHoles(e)||_iterableToArrayLimit(e,t)||_unsupportedIterableToArray(e,t)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(e,t){if(e){if("string"==typeof e)return _arrayLikeToArray(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?_arrayLikeToArray(e,t):void 0}}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function _iterableToArrayLimit(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var r=[],n=!0,i=!1,s=void 0;try{for(var o,a=e[Symbol.iterator]();!(n=(o=a.next()).done)&&(r.push(o.value),!t||r.length!==t);n=!0);}catch(c){i=!0,s=c}finally{try{n||null==a.return||a.return()}finally{if(i)throw s}}return r}}function _arrayWithHoles(e){if(Array.isArray(e))return e}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function _createClass(e,t,r){return t&&_defineProperties(e.prototype,t),r&&_defineProperties(e,r),e}(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{GBrv:function(e,t,r){"use strict";r.r(t),r.d(t,"BackgroundModule",(function(){return A}));var n,i,s,o=r("ofXK"),a=r("tyNb"),c=r("mrSG"),u=r("IzEk"),l=r("73Pe"),d=r("Qw5O"),h=r("AytR"),f=r("E8n8"),b=r("fXoL"),p=r("tQGB"),g=r("6nr9"),y=r("cqYI"),v=r("RKI1"),m=r("vKPz"),k=r("XPoy"),w=[{path:"**",component:(n=function(){function e(t,r,n,i,s,o,a){_classCallCheck(this,e),this.browser=t,this.settings=r,this.router=n,this.debug=i,this.animeProvider=s,this.favoriteAnimes=o,this.viewedEpisodes=a,this.checkedEpisodes=[],this.badgeCount=0}return _createClass(e,[{key:"ngOnInit",value:function(){this.debug.enable(!0),this.browser.isWebExtension||!h.a.production?this.init():this.router.navigate(["/"])}},{key:"init",value:function(){var e,t=this;this.browser.setBadgeColors("#666","#fff"),this.debug.log({rate:this.settings.autoCheckRate,notifications:this.settings.enableNotifications?"on":"off"}),this.autoCheckLoop(),null===(e=this.browser.api)||void 0===e||e.notifications.onClicked.addListener((function(e){var r;t.debug.log("Notification clicked:",e);var n=_slicedToArray(e.split("::").map((function(e){return+e})),2),i=(n[0],n[1]);if(i>=0){var s=t.checkedEpisodes[i],o=null===(r=s.streamLinks[0])||void 0===r?void 0:r.url;(null==o?void 0:o.length)&&(t.browser.createTab(o),t.viewedEpisodes.add(s))}}))}},{key:"autoCheckLoop",value:function(){var e=this;setTimeout((function(){return Object(c.a)(e,void 0,void 0,regeneratorRuntime.mark((function e(){var t,r,n,i,s=this;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.getRecentEpisodesCount();case 2:if(t=e.sent,r=_slicedToArray(t,2),n=r[0],i=r[1],this.debug.log("Recent episodes count:",n),e.t0=n>0,!e.t0){e.next=19;break}return e.next=11,this.browser.getBadgeText();case 11:if(!e.sent.length){e.next=15;break}this.badgeCount+=n,e.next=16;break;case 15:this.badgeCount=n;case 16:this.debug.log("Total count:",this.badgeCount),this.browser.setBadgeText(this.badgeCount),this.settings.enableNotifications&&i.forEach((function(e){var t=Object(l.f)().getTime()+"::"+e.episode.index;s.browser.sendNotification(e.message,t)}));case 19:return e.next=21,this.settings.refresh();case 21:this.autoCheckLoop();case 22:case"end":return e.stop()}}),e,this)})))}),60*this.settings.autoCheckRate*1e3)}},{key:"getRecentEpisodesCount",value:function(){var e=this;return new Promise((function(t,r){return Object(c.a)(e,void 0,void 0,regeneratorRuntime.mark((function e(){var r,n,i,s=this;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=0,n=[],e.next=3,this.animeProvider.getLatestEpisodes(!0).pipe(Object(u.a)(1)).toPromise();case 3:return i=e.sent,this.debug.log("Latest episodes:",i),this.debug.log("Checked episodes:",this.checkedEpisodes),e.next=8,this.viewedEpisodes.refresh();case 8:return e.next=10,this.favoriteAnimes.refresh();case 10:i.forEach((function(e){!s.isAlreadyChecked(e)&&Object(l.e)(new Date(e.releaseDate))&&!s.viewedEpisodes.isViewed(e)&&s.favoriteAnimes.isFavorite(e.anime.title)&&s.hasMatchingSubtitles(e)&&(n.push({message:"".concat(e.anime.title," ").concat(e.number," released!"),episode:{index:r}}),r++,s.checkedEpisodes.push(e))})),t([r,n]);case 12:case"end":return e.stop()}}),e,this)})))}))}},{key:"hasMatchingSubtitles",value:function(e){var t=this;return this.settings.preferredSubtitles===f.a.Any||!!e.streamLinks.find((function(e){return e.lang.toLowerCase()===t.settings.preferredSubtitles.toLowerCase()}))}},{key:"isAlreadyChecked",value:function(e){return!!this.checkedEpisodes.find((function(t){return Object(d.a)(t.anime.title,e.anime.title)&&t.number===e.number}))}}]),e}(),n.\u0275fac=function(e){return new(e||n)(b.Xb(p.a),b.Xb(g.a),b.Xb(a.c),b.Xb(y.a),b.Xb(v.a),b.Xb(m.a),b.Xb(k.a))},n.\u0275cmp=b.Rb({type:n,selectors:[["app-main"]],decls:0,vars:0,template:function(e,t){},styles:[""]}),n)}],C=((s=function e(){_classCallCheck(this,e)}).\u0275mod=b.Vb({type:s}),s.\u0275inj=b.Ub({factory:function(e){return new(e||s)},imports:[[a.f.forChild(w)],a.f]}),s),A=((i=function e(){_classCallCheck(this,e)}).\u0275mod=b.Vb({type:i}),i.\u0275inj=b.Ub({factory:function(e){return new(e||i)},imports:[[o.b,C]]}),i)}}]);
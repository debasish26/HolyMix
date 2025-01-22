var rt=Object.defineProperty;var V=n=>{throw TypeError(n)};var ot=(n,t,i)=>t in n?rt(n,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):n[t]=i;var _=(n,t,i)=>ot(n,typeof t!="symbol"?t+"":t,i),R=(n,t,i)=>t.has(n)||V("Cannot "+i);var e=(n,t,i)=>(R(n,t,"read from private field"),i?i.call(n):t.get(n)),f=(n,t,i)=>t.has(n)?V("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(n):t.set(n,i),p=(n,t,i,s)=>(R(n,t,"write to private field"),s?s.call(n,i):t.set(n,i),i),d=(n,t,i)=>(R(n,t,"access private method"),i);import{V as ht,i as dt,b as C,p as at,c as O,Q as N,l as j,e as ut,D as x,R as ct,T as lt,d as k,L as $,I as ft,f as q,g as pt,h as vt,j as yt,k as gt}from"./index-CCPscKoO.js";const Lt=n=>gt(n);var T,h,o,D,b,r,E,M,U,F,Q,K,W,B,J,X,Y,z,G,Z,tt;class St{constructor(t,i){f(this,r);f(this,T);f(this,h);f(this,o,null);f(this,D,null);_(this,"config",{});f(this,b,new Set);p(this,T,t),p(this,h,i)}get instance(){return e(this,o)}setup(t){const{streamType:i}=e(this,h).$state,s=O(i).includes("live"),c=O(i).includes("ll-");p(this,o,new t({lowLatencyMode:c,backBufferLength:c?4:s?8:void 0,renderTextTracksNatively:!1,...this.config}));const u=d(this,r,F).bind(this);for(const l of Object.values(t.Events))e(this,o).on(l,u);e(this,o).on(t.Events.ERROR,d(this,r,Y).bind(this));for(const l of e(this,b))l(e(this,o));e(this,h).player.dispatch("hls-instance",{detail:e(this,o)}),e(this,o).attachMedia(e(this,T)),e(this,o).on(t.Events.AUDIO_TRACK_SWITCHED,d(this,r,W).bind(this)),e(this,o).on(t.Events.LEVEL_SWITCHED,d(this,r,B).bind(this)),e(this,o).on(t.Events.LEVEL_LOADED,d(this,r,X).bind(this)),e(this,o).on(t.Events.LEVEL_UPDATED,d(this,r,J).bind(this)),e(this,o).on(t.Events.NON_NATIVE_TEXT_TRACKS_FOUND,d(this,r,Q).bind(this)),e(this,o).on(t.Events.CUES_PARSED,d(this,r,K).bind(this)),e(this,h).qualities[N.enableAuto]=d(this,r,G).bind(this),j(e(this,h).qualities,"change",d(this,r,Z).bind(this)),j(e(this,h).audioTracks,"change",d(this,r,tt).bind(this)),p(this,D,ut(d(this,r,M).bind(this)))}onInstance(t){return e(this,b).add(t),()=>e(this,b).delete(t)}loadSource(t){var i;C(t.src)&&((i=e(this,o))==null||i.loadSource(t.src))}destroy(){var t,i;(t=e(this,o))==null||t.destroy(),p(this,o,null),(i=e(this,D))==null||i.call(this),p(this,D,null)}}T=new WeakMap,h=new WeakMap,o=new WeakMap,D=new WeakMap,b=new WeakMap,r=new WeakSet,E=function(t,i){return new x(Lt(t),{detail:i})},M=function(){if(!e(this,h).$state.live())return;const t=new ct(d(this,r,U).bind(this));return t.start(),t.stop.bind(t)},U=function(){var t;e(this,h).$state.liveSyncPosition.set(((t=e(this,o))==null?void 0:t.liveSyncPosition)??1/0)},F=function(t,i){var s;(s=e(this,h).player)==null||s.dispatch(d(this,r,E).call(this,t,i))},Q=function(t,i){const s=d(this,r,E).call(this,t,i);let c=-1;for(let u=0;u<i.tracks.length;u++){const l=i.tracks[u],a=l.subtitleTrack??l.closedCaptions,w=new lt({id:`hls-${l.kind}-${u}`,src:a==null?void 0:a.url,label:l.label,language:a==null?void 0:a.lang,kind:l.kind,default:l.default});w[k.readyState]=2,w[k.onModeChange]=()=>{w.mode==="showing"?(e(this,o).subtitleTrack=u,c=u):c===u&&(e(this,o).subtitleTrack=-1,c=-1)},e(this,h).textTracks.add(w,s)}},K=function(t,i){var l;const s=(l=e(this,o))==null?void 0:l.subtitleTrack,c=e(this,h).textTracks.getById(`hls-${i.type}-${s}`);if(!c)return;const u=d(this,r,E).call(this,t,i);for(const a of i.cues)a.positionAlign="auto",c.addCue(a,u)},W=function(t,i){const s=e(this,h).audioTracks[i.id];if(s){const c=d(this,r,E).call(this,t,i);e(this,h).audioTracks[$.select](s,!0,c)}},B=function(t,i){const s=e(this,h).qualities[i.level];if(s){const c=d(this,r,E).call(this,t,i);e(this,h).qualities[$.select](s,!0,c)}},J=function(t,i){i.details.totalduration>0&&e(this,h).$state.inferredLiveDVRWindow.set(i.details.totalduration)},X=function(t,i){var P;if(e(this,h).$state.canPlay())return;const{type:s,live:c,totalduration:u,targetduration:l}=i.details,a=d(this,r,E).call(this,t,i);e(this,h).notify("stream-type-change",c?s==="EVENT"&&Number.isFinite(u)&&l>=10?"live:dvr":"live":"on-demand",a),e(this,h).notify("duration-change",u,a);const w=e(this,o).media;e(this,o).currentLevel===-1&&e(this,h).qualities[N.setAuto](!0,a);for(const y of e(this,o).audioTracks){const H={id:y.id.toString(),label:y.name,language:y.lang||"",kind:"main"};e(this,h).audioTracks[$.add](H,a)}for(const y of e(this,o).levels){const H={id:((P=y.id)==null?void 0:P.toString())??y.height+"p",width:y.width,height:y.height,codec:y.codecSet,bitrate:y.bitrate};e(this,h).qualities[$.add](H,a)}w.dispatchEvent(new x("canplay",{trigger:a}))},Y=function(t,i){var s;if(i.fatal)switch(i.type){case"mediaError":(s=e(this,o))==null||s.recoverMediaError();break;default:d(this,r,z).call(this,i.error);break}},z=function(t){e(this,h).notify("error",{message:t.message,code:1,error:t})},G=function(){e(this,o)&&(e(this,o).currentLevel=-1)},Z=function(){const{qualities:t}=e(this,h);!e(this,o)||t.auto||(e(this,o)[t.switch+"Level"]=t.selectedIndex,ft&&(e(this,T).currentTime=e(this,T).currentTime))},tt=function(){const{audioTracks:t}=e(this,h);e(this,o)&&e(this,o).audioTrack!==t.selectedIndex&&(e(this,o).audioTrack=t.selectedIndex)};var m,g,I,L,it,et,st,nt;class Et{constructor(t,i,s){f(this,L);f(this,m);f(this,g);f(this,I);p(this,m,t),p(this,g,i),p(this,I,s),d(this,L,it).call(this)}}m=new WeakMap,g=new WeakMap,I=new WeakMap,L=new WeakSet,it=async function(){const t={onLoadStart:d(this,L,et).bind(this),onLoaded:d(this,L,st).bind(this),onLoadError:d(this,L,nt).bind(this)};let i=await mt(e(this,m),t);if(q(i)&&!C(e(this,m))&&(i=await Tt(e(this,m),t)),!i)return null;if(!i.isSupported()){const s="[vidstack] `hls.js` is not supported in this environment";return e(this,g).player.dispatch(new x("hls-unsupported")),e(this,g).notify("error",{message:s,code:4}),null}return i},et=function(){e(this,g).player.dispatch(new x("hls-lib-load-start"))},st=function(t){e(this,g).player.dispatch(new x("hls-lib-loaded",{detail:t})),e(this,I).call(this,t)},nt=function(t){const i=pt(t);e(this,g).player.dispatch(new x("hls-lib-load-error",{detail:i})),e(this,g).notify("error",{message:i.message,code:4,error:i})};async function Tt(n,t={}){var i,s,c,u,l;if(!q(n)){if((i=t.onLoadStart)==null||i.call(t),n.prototype&&n.prototype!==Function)return(s=t.onLoaded)==null||s.call(t,n),n;try{const a=(c=await n())==null?void 0:c.default;if(a&&a.isSupported)(u=t.onLoaded)==null||u.call(t,a);else throw Error("");return a}catch(a){(l=t.onLoadError)==null||l.call(t,a)}}}async function mt(n,t={}){var i,s,c;if(C(n)){(i=t.onLoadStart)==null||i.call(t);try{if(await vt(n),!yt(window.Hls))throw Error("");const u=window.Hls;return(s=t.onLoaded)==null||s.call(t,u),u}catch(u){(c=t.onLoadError)==null||c.call(t,u)}}}const wt="https://cdn.jsdelivr.net";var A,v,S;class xt extends ht{constructor(){super(...arguments);_(this,"$$PROVIDER_TYPE","HLS");f(this,A,null);f(this,v,new St(this.video,this.ctx));f(this,S,`${wt}/npm/hls.js@^1.5.0/dist/hls.min.js`)}get ctor(){return e(this,A)}get instance(){return e(this,v).instance}get type(){return"hls"}get canLiveSync(){return!0}get config(){return e(this,v).config}set config(i){e(this,v).config=i}get library(){return e(this,S)}set library(i){p(this,S,i)}preconnect(){C(e(this,S))&&at(e(this,S))}setup(){super.setup(),new Et(e(this,S),this.ctx,i=>{p(this,A,i),e(this,v).setup(i),this.ctx.notify("provider-setup",this);const s=O(this.ctx.$state.source);s&&this.loadSource(s)})}async loadSource(i,s){if(!C(i.src)){this.removeSource();return}this.media.preload=s||"",this.appendSource(i,"application/x-mpegurl"),e(this,v).loadSource(i),this.currentSrc=i}onInstance(i){const s=e(this,v).instance;return s&&i(s),e(this,v).onInstance(i)}destroy(){e(this,v).destroy()}}A=new WeakMap,v=new WeakMap,S=new WeakMap,_(xt,"supported",dt());export{xt as HLSProvider};

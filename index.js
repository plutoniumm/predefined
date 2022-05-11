!function(){"use strict";var e=dom={onClickOutside:(e,t)=>{document.addEventListener("click",(r=>{e.contains(r.target)||t()}))}};var t=storage={parseCookie:e=>e.split(";").map((e=>e.split("="))).reduce(((e,t)=>(e[decodeURIComponent(t[0].trim())]=decodeURIComponent(t[1].trim()),e)),{}),copyToClipboard:e=>{const t=document.createElement("textarea");t.value=e,t.setAttribute("readonly",""),t.style.position="absolute",t.style.left="-9999px",document.body.appendChild(t);const r=document.getSelection().rangeCount>0&&document.getSelection().getRangeAt(0);t.select(),document.execCommand("copy"),document.body.removeChild(t),r&&(document.getSelection().removeAllRanges(),document.getSelection().addRange(r))},URLParams:class{constructor(e){this.url=e||window.location.search,this.paramsObj=new URLparamsObj(this.url)}get(){const e=this.paramsObj.entries(),t={};for(let r of e)t[r[0]]=r[1];return t}set(e,t){this.paramsObj.set(e,t);const{protocol:r,host:n,pathname:o}=window.location,s=`${r}//${n}${o}?${this.paramsObj.toString()}`;window.history.pushState({path:s},"",s)}}};var r=math={uuid:()=>([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,(e=>(e^crypto.getRandomValues(new Uint8Array(1))[0]&15>>e/4).toString(16))),xor:(e,t)=>{if("string"==typeof e&&"string"==typeof t){let r="";for(i=0;i<e.length;i++)r+=String.fromCharCode(e[i].charCodeAt(0).toString()^t.charCodeAt(0).toString());return r}},hash:e=>crypto.subtle.digest("SHA-256",new TextEncoder("utf-8").encode(e)).then((e=>{let t=[],r=new DataView(e);for(let e=0;e<r.byteLength;e+=4)t.push(("00000000"+r.getUint32(e).toString(16)).slice(-8));return t.join("")})),range:function(e,t,r=1){return{[Symbol.iterator](){return this},next:()=>e<t?{value:e+=r,done:!1}:{done:!0,value:t}}}};var n=parser={String2HTML:e=>e.replace(/[&<>'"]/g,(e=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[e]||e))),HTML2String:e=>e.replace(/&amp;|&lt;|&gt;|&#39;|&quot;/g,(e=>({"&amp;":"&","&lt;":"<","&gt;":">","&#39;":"'","&quot;":'"'}[e]||e)))};var o=std={thread:e=>{const t=new Worker(URL.createObjectURL(new Blob([`postMessage((${e})());`]),{type:"application/javascript; charset=utf-8"}));return new Promise(((e,r)=>{t.onmessage=({data:r})=>{e(r),t.terminate()},t.onerror=e=>{r(e),t.terminate()}}))},debounce:function(e,t,r){let n;return()=>{let o=this,s=arguments,i=r&&!n;clearTimeout(n),n=setTimeout((function(){n=null,r||e.apply(o,s)}),t),i&&e.apply(o,s)}},delay:e=>new Promise((t=>setTimeout(t,e)))},s=0;function a(e,t){var r=t.data;if(Array.isArray(r)&&!(r.length<2)){var n=r[0],o=r[1],s=r[2],i=e._callbacks[n];i&&(delete e._callbacks[n],i(o,s))}}function c(e){var t=this;t._worker=e,t._callbacks={},e.addEventListener("message",(function(e){a(t,e)}))}c.prototype.postMessage=function(e){var t=this,r=s++,n=[r,e];return new Promise((function(e,o){if(t._callbacks[r]=function(t,r){if(t)return o(new Error(t.message));e(r)},void 0!==t._worker.controller){var s=new MessageChannel;s.port1.onmessage=function(e){a(t,e)},t._worker.controller.postMessage(n,[s.port2])}else t._worker.postMessage(n)}))};var u=(()=>{let e=function(t){if("string"==typeof t){const e=/^<(\w+)>F/.exec(t);return null!==e?[document.createElement(e[1])]:[...document.querySelectorAll(t)]}if(t instanceof HTMLElement)return[t];if(Array.isArray(t)){const r=[];return t.forEach((t=>r.push(...e(t)))),r}if("isPredefined"in t)return t.sel();throw TypeError("Expected string | HTMLElement | Array: got "+typeof t)};const t=function(...t){let r=e(t),n=r.forEach.bind(r);return{on:function(e,t){return n((r=>r.addEventListener(e,t))),this},off:function(e,t){return n((r=>r.removeEventListener(e,t))),this},css:function(e){return n((t=>t.style.cssText+=e)),this},html:function(e){return n((t=>t.innerHTML=e)),this},text:function(e){return n((t=>t.innerText=e)),this},addClass:function(e){return n((t=>t.classList.add(e))),this},toggleClass:function(e){return n((t=>t.classList.toggle(e))),this},removeClass:function(e){return n((t=>t.classList.remove(e))),this},empty:function(){return n((e=>e.innerHTML="")),this},attr:function(e,t){return n((r=>r.setAttribute(e,t))),this},removeAttr:function(e){return n((t=>t.removeAttribute(e))),this},parent:function(){return n(((e,t)=>{r[t]=e.parentNode})),this},remove:function(){return n((e=>e.remove())),this},sel:()=>r,isPredefined:!0}};return t.fragment=()=>t(document.createDocumentFragment()),t})();module.exports={PromiseWorker:c,dom:e,storage:t,math:r,parser:n,std:o,F:u,FA:e=>[...document.querySelectorAll(e)]}}();

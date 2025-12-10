import{a as S,S as q,i as l}from"./assets/vendor-CJfIX3tG.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function a(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(e){if(e.ep)return;e.ep=!0;const s=a(e);fetch(e.href,s)}})();const B="53403770-87d4de3df2f0f55697bb62e3a",A="https://pixabay.com/api/";async function u(r,t){return(await S.get(A,{params:{key:B,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:t}})).data}const m=document.querySelector(".gallery"),i=document.getElementById("loader");document.querySelector(".load-more-wrapper");document.getElementById("load-more-btn");const p=new q(".gallery a",{captionsData:"alt",captionDelay:250});function f(r){if(!Array.isArray(r)||r.length===0)return;const t=r.map(a=>{const{webformatURL:o,largeImageURL:e,tags:s,likes:n,views:b,comments:w,downloads:E}=a;return`
      <li class="gallery-item">
        <a class="card" href="${e}">
        <img src="${o}" alt="${s}" loading="lazy" />
        <div class="info">
          <div class="meta">
            <div class="stat">
              <span class="stat-title">Likes</span>
              <span class="stat-value">${n}</span>
            </div>
            <div class="stat">
              <span class="stat-title">Views</span>
              <span class="stat-value">${b}</span>
            </div>
            <div class="stat">
              <span class="stat-title">Comments</span>
              <span class="stat-value">${w}</span>
            </div>
            <div class="stat">
              <span class="stat-title">Downloads</span>
              <span class="stat-value">${E}</span>
            </div>
          </div>
        </div>
        </a>
      </li>
    `}).join("");m.insertAdjacentHTML("beforeend",t),p.refresh()}function R(){m.innerHTML="",p.refresh()}function h(){i.classList.remove("is-hidden"),i.classList.add("is-visible"),i.setAttribute("aria-hidden","false")}function y(){i.classList.remove("is-visible"),i.classList.add("is-hidden"),i.setAttribute("aria-hidden","true")}function I(){document.querySelector(".load-more-wrapper").classList.remove("is-hidden")}function g(){document.querySelector(".load-more-wrapper").classList.add("is-hidden")}let c=1,v="",d=0;const P=document.getElementById("load-more-btn"),L=document.querySelector(".form"),$=L.querySelector('input[name="search-text"]');L.addEventListener("submit",async r=>{r.preventDefault();const t=$.value.trim();if(!t){l.error({title:"Error",message:"Please enter a search term.",position:"topRight"});return}c=1,v=t,R(),g(),h();try{const a=await u(t,c);d=a.totalHits;const o=a.hits;if(o.length===0){l.info({title:"No results",message:"Sorry, there are no images matching your search query.",position:"topRight"});return}f(o),o.length>=15&&d>o.length&&I()}catch{l.error({title:"Error",message:"Something went wrong",position:"topRight"})}finally{y()}});P.addEventListener("click",async()=>{c+=1,h();try{const r=await u(v,c);f(r.hits);const t=document.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollBy({top:t*2,behavior:"smooth"}),document.querySelectorAll(".gallery-item").length>=d&&(g(),l.info({title:"End of results",message:"We're sorry, but you've reached the end of search results.",position:"topRight"}))}catch{l.error({title:"Error",message:"Failed to load more images.",position:"topRight"})}finally{y()}});
//# sourceMappingURL=index.js.map

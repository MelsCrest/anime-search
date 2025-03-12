const v=document.querySelector(".js-input-search"),b=document.querySelector(".js-btn-search"),h=document.querySelector(".js-btn-delete"),p=document.querySelector(".js-btn-reset"),d=document.querySelector(".js-anime-list"),f=document.querySelector(".js-fav-list"),S=document.querySelector(".js-btn-log");let o=[],n=[];function x(){console.log(`Tienes ${n.length} animes favoritos`)}S.addEventListener("click",x);function A(){g(),o=[],a(),v.value=""}function g(){n=[],localStorage.removeItem("favAnimes"),l()}p.addEventListener("click",A);h.addEventListener("click",g);function E(e){const c=e.currentTarget.parentElement.parentElement,i=parseInt(c.getAttribute("id")),r=n.findIndex(m=>m.mal_id===i);n.splice(r,1),localStorage.setItem("favAnimes",JSON.stringify(n)),l(),a()}const j=()=>{const e=document.querySelectorAll(".js-close-btn");for(const t of e)t.addEventListener("click",E)};function _(e){const t=parseInt(e.currentTarget.id),s=o.find(i=>i.mal_id===t),c=n.findIndex(i=>i.mal_id===t);c===-1?n.push(s):n.splice(c,1),localStorage.setItem("favAnimes",JSON.stringify(n)),a(),l()}const $=()=>{const e=document.querySelectorAll(".js-anime");for(const t of e)t.addEventListener("click",_)};function a(){d.innerHTML="";for(const e of o){const t=e.images.webp.image_url;t==="https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png"&&(t="https://placehold.co/210x295/ffffff/666666/?text=TV");let i=n.find(m=>m.mal_id===e.mal_id)?"favorite":"",r=e.score>7?`${e.score} Recomendada`:`${e.score}`;d.innerHTML+=`<li id="${e.mal_id}" class="js-anime ${i} box">
                                    <article class="box-card">
                                        <img src="${t}" alt="${e.title}" class="box-card_img">
                                        <h3 class="box-card_title">${e.title}</h3>
                                        <h3>${r}</h3>
                                    </article>
                                </li>`}$()}function l(){f.innerHTML="";for(const e of n){const t=e.images.webp.image_url;t==="https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png"&&(t="https://placehold.co/210x295/ffffff/666666/?text=TV"),f.innerHTML+=`<li id="${e.mal_id}" class="js-anime box2">
            <article class="box2-card">
                <img src="${t}" alt="${e.title}" class="box2-card_img">
                <h3 class="box2-card_title">${e.title}</h3>
                <button class="js-close-btn box2-card_btn">
                    ✖
                </button>
            </article>            
        </li>`}j()}function y(){const e=v.value;L(e)}function L(e){fetch(`https://api.jikan.moe/v4/anime?q=${e}`).then(t=>t.json()).then(t=>{o=t.data,a()})}const u=localStorage.getItem("favAnimes");u&&(n=JSON.parse(u),l());b.addEventListener("click",y);
//# sourceMappingURL=main.js.map

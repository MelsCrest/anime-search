const u=document.querySelector(".js-input-search"),g=document.querySelector(".js-btn-search"),b=document.querySelector(".js-btn-delete"),h=document.querySelector(".js-btn-reset"),m=document.querySelector(".js-anime-list"),d=document.querySelector(".js-fav-list");let a=[],n=[];function x(){v(),a=[],o(),u.value=""}function v(){n=[],localStorage.removeItem("favAnimes"),l()}h.addEventListener("click",x);b.addEventListener("click",v);function S(e){const c=e.currentTarget.parentElement.parentElement,i=parseInt(c.getAttribute("id")),r=n.findIndex(p=>p.mal_id===i);n.splice(r,1),localStorage.setItem("favAnimes",JSON.stringify(n)),l(),o()}const A=()=>{const e=document.querySelectorAll(".js-close-btn");for(const t of e)t.addEventListener("click",S)};function E(e){const t=parseInt(e.currentTarget.id),s=a.find(i=>i.mal_id===t),c=n.findIndex(i=>i.mal_id===t);c===-1?n.push(s):n.splice(c,1),localStorage.setItem("favAnimes",JSON.stringify(n)),o(),l()}const _=()=>{const e=document.querySelectorAll(".js-anime");for(const t of e)t.addEventListener("click",E)};function o(){m.innerHTML="";for(const e of a){const t=e.images.webp.image_url;t==="https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png"&&(t="https://placehold.co/210x295/ffffff/666666/?text=TV");let i=n.find(r=>r.mal_id===e.mal_id)?"favorite":"";m.innerHTML+=`<li id="${e.mal_id}" class="js-anime ${i} box">
                                    <article class="box-card">
                                        <img src="${t}" alt="${e.title}" class="box-card_img">
                                        <h3 class="box-card_title">${e.title}</h3>
                                    </article>
                                </li>`}_()}function l(){d.innerHTML="";for(const e of n){const t=e.images.webp.image_url;t==="https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png"&&(t="https://placehold.co/210x295/ffffff/666666/?text=TV"),d.innerHTML+=`<li id="${e.mal_id}" class="js-anime box2">
            <article class="box2-card">
                <img src="${t}" alt="${e.title}" class="box2-card_img">
                <h3 class="box2-card_title">${e.title}</h3>
                <button class="js-close-btn box2-card_btn">
                    ✖
                </button>
            </article>            
        </li>`}A()}function j(){const e=u.value;y(e)}function y(e){fetch(`https://api.jikan.moe/v4/anime?q=${e}`).then(t=>t.json()).then(t=>{a=t.data,o()})}const f=localStorage.getItem("favAnimes");f&&(n=JSON.parse(f),l());g.addEventListener("click",j);
//# sourceMappingURL=main.js.map

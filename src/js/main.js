'use strict';

const inputSearch = document.querySelector('.js-input-search');
const btnSearch = document.querySelector('.js-btn-search');
const listAnime = document.querySelector('.js-anime-list');
const listFav = document.querySelector('.js-fav-list');

let animes = [];
let favAnimes = [];

//guardar anime favorito
function handleClickFav(ev){
    const animeClicked = parseInt(ev.currentTarget.id);
    const animeFavSelected = animes.find((anime) => anime.mal_id === animeClicked);

    //evitar que se nos duplique el anime fav
    const indexAnimeFav = favAnimes.findIndex((anime) => anime.mal_id === animeClicked);

    if(indexAnimeFav === -1){
        favAnimes.push(animeFavSelected);
    };
    console.log(favAnimes);
    renderAnimeCard(animes);
};

//escuchar animes favoritos
const listenerAnimes = () => {
    const animesLi = document.querySelectorAll('.js-anime');
    for (const anime of animesLi) {
        anime.addEventListener('click', handleClickFav);
    };
};

//funcior para pintar las tarjetas
function renderAnimeCard(list){
    listAnime.innerHTML = '';
    for(const anime of list) {
        const src = anime.images.webp.image_url;
        const imgError = 'https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png';

        if(src === imgError){
            src = 'https://placehold.co/210x295/ffffff/666666/?text=TV';
        };

        //añadir clase a la tarjeta si está en fav
        // const findFav = favAnimes.find((animeFav)=>animeFav.id === animes.mal_id);

        // let css = findFav ? 'favorite' : '';

        listAnime.innerHTML += `<li id="${anime.mal_id}" class="js-anime ${css}">
                                    <article>
                                        <img src="${src}" alt="${anime.title}">
                                        <h3>${anime.title}</h3>
                                    </article>
                                </li>`;
    }
    listenerAnimes();
};

//función para buscar el anime
function getAnime(){
    const animeName = inputSearch.value;
    getDataApi(animeName);  
};

//Petición al servidor
function getDataApi(animeName){
    fetch(`https://api.jikan.moe/v4/anime?q=${animeName}`)
    .then((response) => response.json())
    .then((info) => {
        animes = info.data;
        renderAnimeCard(animes); //pinto cuando me llegan los datos del servidor
    });
    
};

btnSearch.addEventListener('click', getAnime);


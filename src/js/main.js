'use strict';

const inputSearch = document.querySelector('.js-input-search');
const btnSearch = document.querySelector('.js-btn-search');
const btnDeleteFav = document.querySelector('.js-btn-delete')
const listAnime = document.querySelector('.js-anime-list');
const listFav = document.querySelector('.js-fav-list');

let animes = [];
let favAnimes = [];

function handleDeleteFav(){
    favAnimes = [];
    localStorage.removeItem('favAnimes');
    renderFavoriteCard(favAnimes);
};

btnDeleteFav.addEventListener('click', handleDeleteFav);

//eliminar anime favorito
function handleRemoveFav(ev){
    const btnClick = ev.currentTarget;
    const articleElement = btnClick.parentElement;
    const liElement = articleElement.parentElement;
    const indexAnime = parseInt(liElement.getAttribute('id'));

    const indexAnimeFavRemove = favAnimes.findIndex((anime) => anime.mal_id === indexAnime);
    favAnimes.splice(indexAnimeFavRemove, 1);
    localStorage.setItem('favAnimes', JSON.stringify(favAnimes));
    renderFavoriteCard(favAnimes); //actualiza las tarjetas favoritas eliminando la seleccionada
    renderAnimeCard(animes); //actualiza las tarjetas de las series sin estilo
};

const listenerBtnRemove = () => {
    const btnsRemove = document.querySelectorAll('.js-close-btn');
    for (const button of btnsRemove) {
        button.addEventListener('click', handleRemoveFav);
    };
};

//guardar anime favorito
function handleClickFav(ev){
    const animeClicked = parseInt(ev.currentTarget.id);
    const animeFavSelected = animes.find((anime) => anime.mal_id === animeClicked); //anime
    //evitar duplicar el anime en favAnimes
    const indexAnimeFav = favAnimes.findIndex((anime) => anime.mal_id === animeClicked);//-1

    if(indexAnimeFav === -1){
        favAnimes.push(animeFavSelected);//guarda
    }else{
        favAnimes.splice(indexAnimeFav, 1);
    }
    ;
    //guardar en LS los animes favoritos
    localStorage.setItem('favAnimes', JSON.stringify(favAnimes));

    renderAnimeCard(animes);
    renderFavoriteCard(favAnimes);
};

//escuchar animes favoritos
const listenerAnimes = () => {
    const animesLi = document.querySelectorAll('.js-anime');
    for (const anime of animesLi) {
        anime.addEventListener('click', handleClickFav);
    };
};

//pintar las tarjetas
function renderAnimeCard(list){
    listAnime.innerHTML = '';
    for(const anime of list) {
        const src = anime.images.webp.image_url;
        const imgError = 'https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png';

        if(src === imgError){
            src = 'https://placehold.co/210x295/ffffff/666666/?text=TV';
        };
    //añadir clase a la tarjeta si está en fav
        const findFav = favAnimes.find((animeFav) => animeFav.mal_id === anime.mal_id);
        let css = findFav ? 'favorite' : '';

        listAnime.innerHTML += `<li id="${anime.mal_id}" class="js-anime ${css}">
                                    <article>
                                        <img src="${src}" alt="${anime.title}">
                                        <h3>${anime.title}</h3>
                                    </article>
                                </li>`;
    }
    listenerAnimes();
};
//pintar tarjetas fav
function renderFavoriteCard(list){
    listFav.innerHTML = '';
    for(const anime of list) {
        const src = anime.images.webp.image_url;
        const imgError = 'https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png';

        if(src === imgError){
            src = 'https://placehold.co/210x295/ffffff/666666/?text=TV';
        };

        listFav.innerHTML += 
        `<li id="${anime.mal_id}" class="js-anime">
            <article>
                <button class="js-close-btn">
                    <i class="fa-solid fa-xmark"></i>
                </button>
                <img src="${src}" alt="${anime.title}">
                <h3>${anime.title}</h3>
            </article>
        </li>`;
    };
    listenerBtnRemove();
};

//Buscar el anime
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

//obtener los datos de los favos en el LS
const dataFavAnimes = localStorage.getItem('favAnimes');
//comprobar que la lista no está vacía
    if(dataFavAnimes){
        favAnimes = JSON.parse(dataFavAnimes);
        renderFavoriteCard(favAnimes);
    };

btnSearch.addEventListener('click', getAnime);


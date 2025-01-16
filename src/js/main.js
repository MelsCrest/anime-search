'use strict';

const inputSearch = document.querySelector('.js-input-search');
const btnSearch = document.querySelector('.js-btn-search');
const btnDeleteFav = document.querySelector('.js-btn-delete');
const btnReset = document.querySelector('.js-btn-reset');
const listAnime = document.querySelector('.js-anime-list');
const listFav = document.querySelector('.js-fav-list');

let animes = [];
let favAnimes = [];

//botón reset
function handleClickReset(){
    handleDeleteFav();
    animes = [];
    renderAnimeCard();
    inputSearch.value = '';
};

//botón eliminar favoritos y LS
function handleDeleteFav(){
    favAnimes = [];
    localStorage.removeItem('favAnimes');
    renderFavoriteCard();
};

btnReset.addEventListener('click', handleClickReset);
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
    renderFavoriteCard(); //actualiza las tarjetas favoritas eliminando la seleccionada
    renderAnimeCard(); //actualiza las tarjetas de las series sin estilo
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

    renderAnimeCard();
    renderFavoriteCard();
};

//escuchar animes favoritos
const listenerAnimes = () => {
    const animesLi = document.querySelectorAll('.js-anime');
    for (const anime of animesLi) {
        anime.addEventListener('click', handleClickFav);
    };
};

//pintar las tarjetas
function renderAnimeCard(){
    listAnime.innerHTML = '';
    for(const anime of animes) {
        const src = anime.images.webp.image_url;
        const imgError = 'https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png';

        if(src === imgError){
            src = 'https://placehold.co/210x295/ffffff/666666/?text=TV';
        };
    //añadir clase a la tarjeta si está en fav
        const findFav = favAnimes.find((animeFav) => animeFav.mal_id === anime.mal_id);
        let css = findFav ? 'favorite' : '';

        listAnime.innerHTML += `<li id="${anime.mal_id}" class="js-anime ${css} box">
                                    <article class="box-card">
                                        <img src="${src}" alt="${anime.title}" class="box-card_img">
                                        <h3 class="box-card_title">${anime.title}</h3>
                                    </article>
                                </li>`;
    }
    listenerAnimes();
};

//pintar tarjetas fav
function renderFavoriteCard(){
    listFav.innerHTML = '';
    for(const anime of favAnimes) {
        const src = anime.images.webp.image_url;
        const imgError = 'https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png';

        if(src === imgError){
            src = 'https://placehold.co/210x295/ffffff/666666/?text=TV';
        };

        listFav.innerHTML += 
        `<li id="${anime.mal_id}" class="js-anime box2">
            <article class="box2-card">
                <button class="js-close-btn box2-card_btn">
                    <i class="fa-solid fa-xmark btn-close"></i>
                </button>
                <img src="${src}" alt="${anime.title}" class="box2-card_img">
                <h3 class="box2-card_title">${anime.title}</h3>
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
        renderAnimeCard(); //pinto cuando me llegan los datos del servidor
    });
    
};

//obtener los datos de los favos en el LS
const dataFavAnimes = localStorage.getItem('favAnimes');
//comprobar que la lista no está vacía
    if(dataFavAnimes){
        favAnimes = JSON.parse(dataFavAnimes);
        renderFavoriteCard();
    };

btnSearch.addEventListener('click', getAnime);


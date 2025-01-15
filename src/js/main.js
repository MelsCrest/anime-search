'use strict';

const inputSearch = document.querySelector('.js-input-search');
const btnSearch = document.querySelector('.js-btn-search');
const listAnime = document.querySelector('.js-anime-list');

let animes = [];
let favAnimes = [];

//funcior para pintar las tarjetas
function renderAnimeCard(list){
    listAnime.innerHTML = '';
    for(let i = 0; i < animes.length; i++) {
        const src = animes[i].images.webp.image_url;
        const title = animes[i].title;
        const imgError = 'https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png';

        if(src === imgError){
            src = 'https://placehold.co/210x295/ffffff/666666/?text=TV';
        };

        listAnime.innerHTML += `<li>
                                <article>
                                    <img src="${src}" alt="${title}">
                                    <h3>${title}</h3>
                                </article>
                            </li>`;
    }
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

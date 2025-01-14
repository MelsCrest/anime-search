'use strict';

const inputSearch = document.querySelector('.js-input-search');
const btnSearch = document.querySelector('.js-btn-search');
const image = document.querySelector('.js-img');

let animes = [];
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
        image.src = info.data[0].images.webp.image_url; //sustituir image por const src
        image.alt = info.data[0].title; //sustituir image por const alt
        console.log(info);
    });
    
};

btnSearch.addEventListener('click', getAnime);

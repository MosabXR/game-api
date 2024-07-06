'use strict';

import Game from './games.module.js';
import Details from './details.module.js';
// import displayData from './ui.module.js';

let games = [];
let gameContainer = document.querySelector('.row');
let categories = document.querySelectorAll('ul li a');
let loading = document.querySelector('.loading-screen');

await displayData('mmorpg');

categories.forEach(element => {
    element.addEventListener('click', async (e) => {
        games = [];
        loading.classList.replace('d-none','d-block');
        let category = e.target.innerHTML;
        await displayData(category);
    });
});

document.addEventListener('DOMContentLoaded',()=>{
    loading.classList.replace('d-block','d-none');
});



async function loadGameAPI(category) {
    const url = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '72cd209c39mshd52011f411922eep1cddf8jsn7d6e120ea977',
            'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };

    const api = await fetch(url, options);
    const response = await api.json();

    return response;

}

async function getGames(category) {
    let allGames = await loadGameAPI(category);
    allGames.forEach(game => {
        games.push(new Game(game.id, game.title, game.thumbnail, game.short_description, game.game_url, game.genre, game.platform));
    });

    console.log(games);

}

async function loadDetailsAPI() {

    const url = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=452`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '72cd209c39mshd52011f411922eep1cddf8jsn7d6e120ea977',
            'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };

    const api = await fetch(url, options);
    const response = await api.json();

    return response;

}

async function getDetails() {
    let allDetails = await loadDetailsAPI();
    console.log(new Details(allDetails.id, allDetails.title, allDetails.thumbnail, allDetails.short_description, allDetails.game_url, allDetails.genre, allDetails.platform, allDetails.status, allDetails.description));
}


async function displayData(category) {
    await getGames(category);
    gameContainer.innerHTML = ``;
    games.forEach(game => {
        gameContainer.innerHTML += `
        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
            <div class="card">
                <img class="card-img-top" src="${game.thumbnail}" alt="${game.title}">
                <div class="card-body">
                    <div class="info d-flex justify-content-between">
                        <h2 class="h5">${game.title}</h2>
                        <h2 class="h5">${game.title}</h2>
                    </div>
                    <div class="description">
                        <p>${game.short_description}</p>
                    </div>
                </div>
                <div class="card-footer d-flex justify-content-between">
                    <div class="bg-custom-red rounded px-3">${game.genre}</div>
                    <div class="bg-custom-red rounded px-3">${game.platform}</div>
                </div>
            </div>
        </div>
        `
    });

    loading.classList.replace('d-block','d-none');
}



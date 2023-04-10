// //? display data from api with class+++++

// //!class--->displaydata+modal details
//*golbal variables
//*=====================>
let rows = document.querySelector(".row");

let navBar = document.querySelector(".navbar-nav.ms-auto");
let storedCategory = "mmorpg";

let descbox = document.querySelector(".descbox");
var games = [];

//*====================================>

//?===========================functions<======================?\\
//*1--get games from api
//*========================>
async function getGames() {
  // loading()
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "96e963fb03mshdac440060e8930fp19f94ajsn35585d6b1e4d",
      "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
    },
  };

  const url = await fetch(
    `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${storedCategory}`,
    options
  );
  const result = await url.json();
  games = result;

  displayGames();
}

getGames();

//*========================================>

//*2--display games on html page
//*==================================>
function displayGames() {
  
  let box = "";
  for (let i = 0; i < games.length; i++) {
    box += `
    <div class="col-md-6 col-xl-3 " onclick='clickCard(${games[i].id})'>
    <div class="card mb-3 bg-transparent">
      <img src="${games[i].thumbnail}" class="p-3 rounded-3" alt="Game image">
      <div class="card-body">
      <div class="d-flex align-items-center justify-content-between">
        <h5 class="card-title text-white " style="font-size:14px;" >${
          games[i].title
        }</h5>
       <span class="badge bg-info">free</span>
        </div>

        <p class="card-text my1 text-muted " style="font-size:12px;" >${games[
          i
        ].short_description.substring(0, 45)} ...</p>

     <div class="card-footer d-flex align-items-center justify-content-between bg-transparent">

         <span class="badge bg-secondary">${games[i].genre}</span>
         <span class="badge bg-secondary">${games[i].platform.substring(
           0,
           12
         )}</span>

     </div>
      </div>
    </div>

  </div>
    `;
  }

  rows.innerHTML = box;
}

let card = document.querySelector(".row");

function clickCard(id) {
  descbox.classList.replace("d-none", "d-block");
  getIdData(id);
}

//*==========================================>

//todo================================================>

//* get specsific game data from id
//*======================================>
async function getIdData(id) {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "96e963fb03mshdac440060e8930fp19f94ajsn35585d6b1e4d",
      "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
    },
  };

  let api = await fetch(
    `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`,
    options
  );
  let result = await api.json();

  descbox.innerHTML = `
  <div class="container gameDetails ">
  <div class="row my-4 mx-2">
  <div class="col-10">
    <h2>${result.title}</h2>
  </div>
<div class="col-2 " >  <div class="fas fa-xmark closure"onclick="hideDiv()" ></div>

  </div>
</div>
<div class="row">
  <div class="col-md-5 my-2"><img src="${result.thumbnail}" alt="gameDetails"></div>
  <div class="col-md-7">
    <h2>title:</h2>
    <div>
      <span class="me-2">category:</span> <span class="badge bg-info">${result.genre}</span>
    </div>
    <div>
      <span class="me-2">Platform:</span><span class="badge bg-info">${result.platform}</span>
    </div>
    <div>
      <span class="me-2">status:</span><span class="badge bg-info">${result.status}</span>
    </div>
    <p  class="p1" >${result.description}</p>
    <a class="btn btn-outline-warning" target="_blank" href="${result.game_url}">show game</a>
  </div>
</div>
</div>
  `;
}
getIdData();

//* hide div function
function hideDiv() {
  descbox.classList.replace("d-block", "d-none");
}

//* -- event listener on nav links
//*=============================>
navBar.addEventListener("click", (e) => {
  loading();
  storedCategory = e.target.textContent;

  getGames();
  loading();
  displayGames();
});

//* navlinks active function
document.querySelectorAll(".ulinks a").forEach(function (link) {
  link.addEventListener("click", function () {
    document.querySelector(".ulinks .active").classList.remove("active");
    link.classList.add("active");
  });
});

function loading() {
  $(".loading").fadeOut(500, function () {
    $(body).css("overflow", "visible");
  });
}

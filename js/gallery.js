const getImageContainer = document.getElementById("images");
import data from "./endpoints.js";

// Faz a requisição da imagem diretamente para api//
function getImage() {
  // Randomiza os parametros //
  const param = Object.keys(data);
  const baseURL = "https://nekos.best/api/v2/";
  const endpoint = param[Math.floor(Math.random() * param.length)];
  // Faz a requisição da api/
  fetch(`${baseURL}${endpoint}`)
    .then((response) => response.json())
    .then((json) => insertImage(json));
}

// faz loop na requisição para adquirir varias imagens //
function getImages() {
  for (let i = 0; i < 20; i++) {
    getImage();
  }
}
// Faz o processo de inserção dos //
function insertImage(data) {
  let div = document.createElement("div");
  div.classList.add("img_container");
  div.style.backgroundImage = `url(${data.results[0].url})`;
  div.style.backgroundSize = "cover";
  getImageContainer.appendChild(div);

  let artist = document.createElement("a");
  artist.textContent = data.results[0].artist_name;
  artist.classList.add("artist_a");
  artist.href = data.results[0].artist_href;
  artist.setAttribute("title", `${data.results[0].artist_name} Social media`);
  div.appendChild(artist);
}

getImages();

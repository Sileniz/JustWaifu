const getImageContainer = document.getElementById("image_container");
const getInfoContainer = document.getElementById("info");
import data from "./endpoints.js";
const getButton = document.getElementById("refresh");
getButton.addEventListener("click", getImage);

// Carrega uma imagem aleatoria ao carregar a pagina//
window.onload = getImage();

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

// Faz o processo de inserção dos //
function insertImage(data) {
  // Processo para informações do artista //
  getInfoContainer.lastElementChild.remove();
  let info = document.createElement("h1");
  info.classList.add("artist_name");
  getInfoContainer.appendChild(info);

  // Processo para link para rede social do artista //
  let socialMedia = document.createElement("a");
  socialMedia.textContent = data.results[0].artist_name;
  socialMedia.href = data.results[0].artist_href;
  socialMedia.setAttribute(
    "title",
    `${data.results[0].artist_name} Social Media`
  );
  info.appendChild(socialMedia);

  // Processo para link para Criação da imagem //
  getImageContainer.innerHTML = "";
  let img = document.createElement("img");
  img.classList.add("image_src");
  img.src = data.results[0].url;
  getImageContainer.appendChild(img);
}

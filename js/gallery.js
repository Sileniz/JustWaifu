// Valores do HTML //

const getImageContainer = document.getElementById("images");
const getSection = document.getElementById("section_openImage_noscale");
const goBlack = document.getElementById("section_gallery");
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
  // Criar o container aonde a imagem sera tributado como background
  let div = document.createElement("div");
  div.classList.add("img_container");
  div.style.backgroundImage = `url(${data.results[0].url})`;
  div.style.backgroundSize = "cover";
  getImageContainer.appendChild(div);

  // Cria o titulo e link para a rede social do artista
  let artist = document.createElement("a");
  artist.textContent = data.results[0].artist_name;
  artist.classList.add("artist_a");
  artist.href = data.results[0].artist_href;
  artist.setAttribute("title", `${data.results[0].artist_name} Social media`);
  div.appendChild(artist);

  // Abrir imagem da galeria ;;

  div.addEventListener("click", () => {
    // Definição de Ids Para animação //

    // Animação modal saida //
    getSection.setAttribute("id", "section_openImage");
    getSection.classList.add("section_openImage");

    // Animação background com opacidade
    goBlack.classList.remove("section_gallery_opacity");
    goBlack.classList.add("section_gallery");

    // Remove algum elemento se já tiver algo
    getSection.innerHTML = "";

    // Criação do elemento para fechar o modal
    let X = document.createElement("span");
    X.innerHTML = "Close Image";
    X.setAttribute("id", "close");

    // Cria o popUp em div
    let popUp = document.createElement("div");
    popUp.appendChild(X);
    popUp.classList.add("openImage");
    getSection.appendChild(popUp);

    // Cria o conteudo que vai ser inserido na div
    let contentPop = document.createElement("img");
    contentPop.src = data.results[0].url;
    popUp.appendChild(contentPop);

    // Diminuição da opacidade ao aparecer o modal e animaa a saida do modal trocando ids e classes // Timeout adicionado para dá tempo para animação
    X.addEventListener("click", () => {
      getSection.setAttribute("id", "section_openImage_noscale");
      setTimeout(() => {
        getSection.innerHTML = "";

        goBlack.classList.remove("section_gallery");
        goBlack.classList.add("section_gallery_opacity");
      }, 400);
    });
  });
}

getImages();

const getImageContainer = document.getElementById("image_container");
const getInfoContainer = document.getElementById("info");
const getButton = document.getElementById("refresh");
getButton.addEventListener("click", getImage);

window.onload(getImage());
// Faz a requisição da imagem diretamente para api//
function getImage() {
  fetch("https://nekos.best/api/v2/neko")
    .then((response) => response.json())
    .then((json) => insertImage(json));
}

// Faz o processo de inserção da imagem //
function insertImage(data) {
  getInfoContainer.lastElementChild.remove();
  let info = document.createElement("h1");
  info.classList.add("artist_name");
  getInfoContainer.appendChild(info);

  let socialMedia = document.createElement("a");
  socialMedia.textContent = data.results[0].artist_name;
  socialMedia.href = data.results[0].artist_href;
  socialMedia.style = "text-decoration: none; color: white;";
  socialMedia.setAttribute(
    "title",
    `${data.results[0].artist_name} Social Media`
  );
  info.appendChild(socialMedia);

  getImageContainer.innerHTML = "";
  let img = document.createElement("img");
  img.classList.add("image_src");
  img.src = data.results[0].url;
  getImageContainer.appendChild(img);
}

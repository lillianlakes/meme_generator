// Outstanding: How can I append multiple image files uploaded from my local disk? More complicated because it is a separate event (onchange vs submit), and it is a local file, not a link.

const formElement = document.querySelector("form");
const urlInput = document.querySelector('#imgURL');
const imgFile = document.querySelector('#imgFile');
const topLineInput = document.querySelector('#textTop');
const bottomLineInput = document.querySelector('#textBottom');
const memeFrame = document.querySelector(".meme-frame");
var uploadedImage = document.createElement('img');

document.getElementById('imgFile').onchange = function(ev) {
  ev.preventDefault();
  let reader = new FileReader();
  reader.onload = function(ev) {
    uploadedImage.src = reader.result;
  };
  reader.readAsDataURL(this.files[0]);
};

formElement.addEventListener("submit", function(event){
    event.preventDefault();

    const newDiv = document.createElement("div");
    newDiv.setAttribute("class", "meme-body");

    if (!!urlInput.value) {
      var newImage = document.createElement('img');
      newImage.src = urlInput.value;
    }

    const newTop = document.createElement("p");
    newTop.setAttribute("class", "top-text");
    newTop.innerText = topLineInput.value;

    const newBottom = document.createElement("p");
    newBottom.setAttribute("class", "bottom-text");
    newBottom.innerText = bottomLineInput.value;

    const close = document.createElement("p");
    close.setAttribute("class", "close");
    close.innerHTML = "&#xf1f8";

    memeFrame.append(newDiv);  
    !!urlInput.value ? newDiv.appendChild(newImage) : newDiv.appendChild(uploadedImage);
    newDiv.append(newTop);
    newDiv.append(close);
    newDiv.append(newBottom);

    urlInput.value = '';
    topLineInput.value = '';
    bottomLineInput.value = '';
});

memeFrame.addEventListener("click", function(e){
  e.preventDefault();
  if(e.target.className === 'close' || e.target.className === 'top-text' || e.target.className === 'bottom-text'){
    e.target.parentElement.remove();
  };
});
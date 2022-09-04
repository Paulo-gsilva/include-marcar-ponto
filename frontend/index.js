import "regenerator-runtime/runtime";
import "./assets/css/style.css";
import imgLogin from "../frontend/assets/img/img-login.png";

function loadImg() {
  const imgElement = document.querySelector(".login-section-img");
  imgElement.src = imgLogin;
  return imgElement;
}

loadImg();

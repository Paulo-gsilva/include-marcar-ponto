const express = require("express");
const route = express.Router();

//ROTA LOGIN
const loginController = require("./src/Controller/loginController");
route.get("/", loginController.loginPage);
route.get("/marcar-ponto", loginController.loginValidation);

//ROTA PROFILE
route.get("/perfil", loginController.profilePage);

module.exports = route;

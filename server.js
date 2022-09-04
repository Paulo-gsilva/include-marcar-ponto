const express = require("express");
const app = express();
const path = require("path");
const routes = require("./routes");
const error = require("./src/Controller/errorController");

app.set("views", path.resolve(__dirname, "src", "views"));
app.set("view engine", "ejs");
app.use(express.static(path.resolve(__dirname, "public")));
app.use(routes);
app.use(error.errorPage);

const port = 3000;

app.listen(port, () => {
  console.log("SERVER IS ON");
});

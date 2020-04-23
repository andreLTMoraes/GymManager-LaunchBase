const express = require("express");
const nunjucks = require("nunjucks");
const routes = require("./routes");

const server = express();

server.use(express.static('public'));
server.use(routes);
server.set("view engine", "njk");

nunjucks.configure("views", {
    express:server,
    autoescape: false, //Permite renderizar elemento html vindos de objetos
    noCache: true
})


server.listen(5000);
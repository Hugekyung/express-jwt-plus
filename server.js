require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const server = express();

server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(morgan("dev"));
require("./routes/index")(server);

server.get("/", (req, res) => {
    res.send(`Hello Express!`);
});

Port = process.env.PORT || 3000;
server.listen(Port, () => {
    console.log(`listening on ${Port} port ... `);
});

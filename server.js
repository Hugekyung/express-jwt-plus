require('dotenv').config();
const express = require('express');
const morgan = require('morgan');

const UserRouter = require('./routes/index');
const server = express();


server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(morgan('dev'));


server.get("/", (req, res) => {
    res.send(`Hello Express!`)
})

server.use("/users", UserRouter);

Port = process.env.PORT || 3000
server.listen(Port, () => {
    console.log('listening on 3030 port ... ')
});
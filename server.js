const express = require('express');
const server = express();

server.get("/", (req, res) => {
    res.send(`Hello Express!`)
})

server.listen(3030, () => {
    console.log('listening on 3030 port ... ')
});
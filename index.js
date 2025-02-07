/*
play this: https://www.youtube.com/watch?v=d-diB65scQU

Sing along:

here's a little code I wrote, please read the README word for word, don't worry, you got this
in every task there may be trouble, but if you worry you make it double, don't worry, you got this
ain't got no sense of what is REST? just concentrate on learning Express, don't worry, you got this
your file is getting way too big, bring a Router and make it thin, don't worry, be crafty
there is no data on that route, just write some code, you'll sort it out… don't worry, just hack it…
I need this code, but don't know where, perhaps should make some middleware, don't worry, just hack it

Pull your server into this file and start it!

******* GABE IS A LEGIT GENIUS!!! *******
*/

require('dotenv').config();

const server = require('./api/server');
const express = require('express');
const PORT = process.env.PORT || 9000;

server.get('/', (req, res) => {
    res.json({ message: 'api is working' });
})

server.use('*', (req, res) => {
    res.send(`<h1>Hello there</h1>`)
})

server.use((err, req, res, next) => {
    res.status(500).json({ message: err.message, stack: err.stack });
})

server.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})

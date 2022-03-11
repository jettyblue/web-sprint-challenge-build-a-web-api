const express = require('express');
const server = express();
const projectsRouter = require('/api/projects/projects-router');
const actionsRouter = require('/api/actions/actions-router');

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

server.use('api/projects/', projectsRouter);
server.use('/api/actions', actionsRouter);

module.exports = server;

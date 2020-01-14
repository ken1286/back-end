const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const authRouter = require('./api/auth/auth-router.js');
const usersRouter = require('./api/routes/users-router.js');
const dinersRouter = require('./api/routes/diners-router.js');
const trucksRouter = require('./api/routes/trucks-router.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);
server.use('/api/diners', dinersRouter);
server.use('/api/trucks', trucksRouter);

server.get('/', (req, res) => {
  res.send('Server running...');
});

module.exports = server;

const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const shortid = require('shortid');

const id = () => shortid.generate();

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Put it to redis biács
const PLAYER = 'PLAYER';
const FIRE = 'FIRE';
let gameObjects = [];

io.on('connection', (socket) => {
  console.log('connection');

  socket.on('joined', (data) => {
    const { name, gender, id } = data;

    socket.uname = name;
    socket.uid = id;

    console.log(data);
    console.log(name, 'Joined');

    const player = {
      type: PLAYER,
      x: 0,
      y: 0,
      name,
      gender,
      id,
    };

    gameObjects = [...gameObjects, player];

    socket.emit('joined', gameObjects);
    io.emit('new player', player);
  });

  socket.on('refresh', (data) => {
    const { id, x, y, currentFrame } = data;
    console.log(data);

    gameObjects = gameObjects.map((obj) => {
      if (obj.id !== id) return obj;

      return Object.assign(obj, { x, y, currentFrame});
    })

    io.emit('refresh', [...gameObjects]);
  });

  socket.on('disconnect', () => {
    const { uname, uid } = socket;
    console.log(uname, uid, 'disconnected');
    gameObjects = gameObjects.filter(obj => obj.id !== uid);
    io.emit('refresh', [...gameObjects]);
  });
});

module.exports = server;

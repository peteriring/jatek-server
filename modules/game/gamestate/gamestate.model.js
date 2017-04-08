const redis = require('redis');
const shortid = require('shortid');
const bluebird = require('bluebird');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const gid = () => shortid.generate();

const REDIS_HOST = '127.0.0.1';
const REDIS_PORT = process.env.REDIS_PORT || 6379;

const client = redis.createClient({
  host: REDIS_HOST,
  potr: REDIS_PORT,
});

exports.addPlayer = (player) => {
  const { id } = player;
  return client.hsetAsync('game', id, JSON.stringify(player))
    .then(() => player);
};

exports.removePlayer = (id) => {
  console.log(id);
  return client.hdelAsync('game', id);
};

exports.refreshState = (gameObject) => {
  return client.hsetAsync('game', gameObject.id, JSON.stringify(gameObject));
};

exports.getGameObject = (id) => {
  return client.hgetAsync('game', id).then(obj => JSON.parse(obj));
}

exports.getState = () => {
  return client.hgetallAsync("game");
};

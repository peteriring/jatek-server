const app = require('./modules/app');
const game = require('./modules/game');

const APP_PORT = 3000;
const GAME_PORT = 3001;

app.listen(APP_PORT, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`App Running on ${APP_PORT}`);
});

game.listen(GAME_PORT, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Game Running on ${GAME_PORT}`);
});

const express = require('express');
const cors = require('cors');
const { gameServer, run } = require('./server');

const app = express();

app.use(cors());

app.get('/', (_req, res) => {
  res.status(200).sendFile(`${__dirname}/game/index.html`);
});

app.get('/js/:script', (req, res) => {
  const { script = '404' } = req.params;
  res.status(200).sendFile(`${__dirname}/game/js/${script}.js`);
});

app.get('/assets', (req, res) => {
  const { path = '/404.png' } = req.query;
  res.status(200).sendFile(`${__dirname}/game/arts/${path}`);
});

app.listen(80, () => { console.log('Estou on!') });

gameServer.listen(4555, () => {
  run();
  console.log('Game on!')
});
require('newrelic');
const express = require('express');
const cluster = require('cluster');
const os = require('os');
const http = require('http');
const https = require('https');

http.globalAgent.maxSockets = Infinity;
https.globalAgent.maxSockets = Infinity;


if (cluster.isMaster) {
  const cpuCount = os.cpus().length
  for (let i = 0; i < cpuCount; i++) {
    cluster.fork();
  }
} else {
  const path = require('path');
  const db = require('../database/index.js');
  const app = express();
  const cors = require('cors');

  app.use(cors());
  app.use(express.static(path.join(__dirname + '/../public')));

  

  app.get(`/artist/relatedArtists/:id`, (req, res) => {
    let id = req.params.id
    db.getRelatedArtists(id, (error, data) => {
      if (error) {
        res.status(503).send(error);
      } else {
        res.send(data);
      }
    });
  });

  app.put(`/artist/relatedArtists/:id`, (req, res) => {
    let id = req.params.id;
    let updatedRelatedArtist = req.body;
    db.updateRelatedArtist(id, updatedRelatedArtist, (error, data) => {
      if (error) {
        res.status(400).send(error);
      } else {
        res.status(202).send(data + 'successful put');
      }
    });
  });

  app.post(`/artist/relatedArtists`, (req, res) => {
    let addRelatedArtist = req.body;
    db.addRelatedArtist(addRelatedArtist, (error, data) => {
      if (error) {
        res.status(400).send(error);
      } else {
        res.status(201).send(data + 'successful post')
      }
    });
  });



  app.delete(`/artist/relatedArtists/:id`, (req, res) => {
    let id = req.params.id;
    db.deleteRelatedArtist(id, (error, data) => {
      if (error) {
        res.status(400).send(error);
      } else {
        res.status(202).send(data + 'successful delete')
      }
    });
  });

  app.listen(3002, () => {
    console.log('listening on port 3002!');
  });
}

cluster.on('exit', (worker) => {
  console.log(`${worker.id} is no more`)
  cluster.fork()
})
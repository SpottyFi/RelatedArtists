const {
  Pool
} = require('pg');

const pool = new Pool({
  // host: "localhost",
  // user: "belguunbat-erdene",
  // database: "artists",
  // port: "5432"
  host: "13.57.15.233",
  user: "power_user",
  password: "power_user",
  database: "artists",
  port: "5432"
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})


const getRelatedArtists = function (id, artistCallback) {
  pool.connect()
    .then(client => {
      return client.query(`SELECT artist_name, artist_id, listeners, artist_image, popular_song
      FROM artist WHERE artist_id IN 
      (SELECT related_artist_id FROM relatedartists WHERE main_artist_id = 
      (SELECT artist_id FROM artist WHERE artist_id = ${id} ))`)
        .then(res => {
          client.release()
          artistCallback(null, res)
          console.log("Successful GET")
        })
        .catch(e => {
          client.release()
          artistCallback(e, null)
          console.log("Error in GET")
        });
    })
};

const updateRelatedArtist = function (id, updateArtist, artistCallback) {
  pool.connect()
    .then(client => {
      return client.query(`UPDATE (artist_name, listeners, artist_image, popular_song) FROM artist 
      WHERE artist_id=${id}`, updateArtist)
        .then(res => {
          artistCallback(null, res)
          console.log("Succesful POST")
        })
        .catch(e => {
          artistCallback(e, null)
          console.log("Error in POST")
        });
    })
};

const deleteRelatedArtist = function (id, artistCallback) {
  pool.connect()
    .then(client => {
      return client.query(`DELETE FROM artist WHERE artist_id=${id}`)
        .then(res => {
          artistCallback(null, res)
          console.log("Successful DELETE")
        })
        .catch(e => {
          artistCallback(e, null)
          console.log("Error in DELETE")
        })
    });
};

const addRelatedArtists = function (relatedArtist, artistCallback) {
  pool.connect()
    .then(client => {
      return client.query(`INSERT INTO artist VALUES 
      (DEFAULT, artist_name, listeners, artist_image, popular_song)`, relatedArtist)
        .then(success => {
          artistCallback(null, success)
          console.log("Successful POST")
        })
        .catch(error => {
          artistCallback(error, null)
          console.log("Error in POST")
        })
    });
};


module.exports.getRelatedArtists = getRelatedArtists;
module.exports.updateRelatedArtist = updateRelatedArtist;
module.exports.deleteRelatedArtist = deleteRelatedArtist;
module.exports.addRelatedArtists = addRelatedArtists;
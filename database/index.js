const { Pool } = require('pg');

const pool = new Pool({
  host: "localhost",
  user: "belguunbat-erdene",
  database: "artists",
  port: "5432"
});


const getRelatedArtists = function (id, artistCallback) {
  let sqlQuery =
    `SELECT artist_name, artist_id, listeners, artist_image, popular_song
    FROM artist WHERE artist_id IN 
    (SELECT related_artist_id FROM "relatedArtists" WHERE main_artist_id = 
    (SELECT artist_id FROM artist WHERE artist_id = ${id} ))`
  pool.query (sqlQuery)
    .then(success => {
      artistCallback(null, success)
      console.log("Successful GET")
    })
    .catch(error => {
      artistCallback(error, null)
      console.log("Error in GET")
    });
};

const updateRelatedArtist = function (id, updateArtist, artistCallback) {
  let sqlQuery = `UPDATE (artist_name, listeners, artist_image, popular_song) FROM artist 
    WHERE artist_id=${id}`
  pool.query(sqlQuery, updateArtist)
    .then(success => {
      artistCallback(null, success)
      console.log("Succesful POST")
    })
    .catch(error => {
      artistCallback(error, null)
      console.log("Error in POST")
    });
};

const deleteRelatedArtist = function (id, artistCallback) {
  let sqlQuery = `DELETE FROM artist WHERE artist_id=${id}`
  pool.query(sqlQuery)
    .then(success => {
      artistCallback(null, success)
      console.log("Successful DELETE")
    })
    .catch(error => {
      artistCallback(error, null)
      console.log("Error in DELETE")
    });
};

const addRelatedArtists = function (relatedArtist, artistCallback) {
  let sqlQuery = 
    `INSERT INTO artist VALUES 
    (DEFAULT, artist_name, listeners, artist_image, popular_song)`
  pool.query(sqlQuery, relatedArtist)
    .then(success => {
      artistCallback(null, success)
      console.log("Successful POST")
    })
    .catch(error => {
      artistCallback(error, null)
      console.log("Error in POST")
    });
};





module.exports.getRelatedArtists = getRelatedArtists;
module.exports.updateRelatedArtist = updateRelatedArtist;
module.exports.deleteRelatedArtist = deleteRelatedArtist;
module.exports.addRelatedArtists = addRelatedArtists;

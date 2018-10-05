const { Pool } = require('pg');

const pool = new Pool({
  host: "localhost",
  user: "belguunbat-erdene",
  database: "artists",
  port: "5432"
});


const getRelatedArtists = function (id, showArtist) {
  let sqlQuery =
    `select artist_name, artist_id, listeners, artist_image, popular_song
    from artist where artist_id in 
    (select related_artist_id from "relatedArtists" where main_artist_id = 
    (select artist_id from artist where artist_id = ${id} ))`
  pool.query (sqlQuery)
    .then(success => {
      showArtist(null, success)
      console.log("Successful GET")
    })
    .catch(error => {
      showArtist(error, null)
      console.log("Error in GET")
    });
};

const updateRelatedArtist = function(id, updateArtist, callback) {
  let sqlQuery = `update`
}





module.exports.getRelatedArtists = getRelatedArtists;

let mysql = require ('mysql');
let connection = mysql.createConnection ({
  host: 'localhost',
  user: 'root',
  // password: 'password',
  database: 'artists',
});

// EXAMPLE QUERY FOR PGADMIN 
// select artist_name, "artistID", listeners, artist_image, "popularSong"
//     from artist where "artistID" in 
//     (select "related_Artist_ID" from "relatedArtists" where "main_Artist_ID" = 
//     (select "artistID" from artist where "artistID" = '10' ))

const getRelatedArtists = function (id, showArtist) {
  let sqlQuery =
    `select artist_name, artistid, listeners, artist_image, popularSong 
    from artist where artistid in 
    (select related_artist_id from relatedartists where main_artist_id = 
    (select artistid from artist where artistid =` +
    connection.escape (id) +
    `))`;
  connection.query (sqlQuery, function (error, result) {
    if (error) {
      console.log ('db query error');
      showArtist (error, null);
    } else {
      console.log ('db query success');
      showArtist (null, result);
    }
  });
};

const updateRelatedArtist = function(id, updateArtist, callback) {
  let sqlQuery = `update`
}





module.exports.getRelatedArtists = getRelatedArtists;

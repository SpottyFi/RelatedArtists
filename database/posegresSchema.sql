DROP DATABASE IF EXISTS artists;
CREATE DATABASE artists;

DROP TABLE IF EXISTS artist;

CREATE TABLE IF NOT EXISTS artist (
  artistID SERIAL PRIMARY KEY,
  artist_name VARCHAR(60) NOT NULL,
  listeners INT NOT NULL,
  artist_image VARCHAR (200) NOT NULL,
  popularSong VARCHAR (130) NOT NULL
);

DROP TABLE IF EXISTS relatedArtists;
		
CREATE TABLE IF NOT EXISTS relatedArtists (
   id SERIAL PRIMARY KEY,
   related_Artist_ID INT NOT NULL,
   main_Artist_ID INT NOT NULL,
   related_Artist_ID INT REFERENCES artist (artistID),
   main_Artist_ID INT REFERENCES artist (artistID)
 );

DROP DATABASE IF EXISTS artists;
CREATE DATABASE artists;

DROP TABLE IF EXISTS artist;

CREATE TABLE IF NOT EXISTS artist (
  artist_id SERIAL PRIMARY KEY,
  artist_name VARCHAR(60) NOT NULL,
  listeners INT NOT NULL,
  artist_image VARCHAR (200) NOT NULL,
  popular_song VARCHAR (130) NOT NULL
);

DROP TABLE IF EXISTS relatedartists;
		
CREATE TABLE IF NOT EXISTS relatedartists (
   id SERIAL PRIMARY KEY,
   related_artist_id INT REFERENCES artist (artist_id),
   main_artist_id INT REFERENCES artist (artist_id)
 );


related_artist_id INT NOT NULL,
   main_artist_id INT NOT NULL,
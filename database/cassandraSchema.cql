DROP KEYSPACE IF EXISTS artists;
CREATE KEYSPACE IF NOT EXISTS artists WITH REPLICATION = {
  'class' : 'SimpleStrategy', 'replication_factor' : 1
};

USE artists;

DROP TABLE IF EXISTS artist;
CREATE TABLE IF NOT EXISTS artists.artist (
  artist_id int,
  artist_name text,
  listeners int,
  artist_image text,
  popular_song text,
  related_artist_id int,
  related_artist_name text,
  related_artist_listeners int,
  related_artist_image text,
  related_artist_popularsong text,
  PRIMARY KEY (artist_id, related_artist_id)
);




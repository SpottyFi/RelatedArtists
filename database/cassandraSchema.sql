
CREATE TABLE IF NOT EXISTS artist (
  artistID uuid PRIMARY KEY,
  artist_name text,
  listeners int,
  artist_image text,
  popularSong text,
);
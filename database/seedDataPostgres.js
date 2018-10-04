let faker = require('faker');
let fs = require('fs');


console.log('STARTING DATA GENERATION!!!!')

for (let i = 1; i <= 10; i++) {
  const artistsStream = fs.createWriteStream(`./artistsList${i}.csv`);

  artistsStream.write('artist_name,listeners,artist_image,popularSong\n');
  let artistsCounter = 0;
  let maxArtists = 1000000;
  let maxRelated = 10000000;
  let artist = '';
  let relatedArtist = '';
  for (let j = 1; j <= maxArtists; j++) {
    artistsCounter++;
    const randomPhotoNumber = Math.floor(Math.random() * 1002);
    artist = artist + ('' +
      faker.name.findName() + ',' + 
      faker.random.number() + ',' +
      `https://s3-us-west-1.amazonaws.com/spottyfi-photos/photos/${randomPhotoNumber}.jpeg` + ',' +
      faker.lorem.word() + '\n'
    )
    if (j % 100 === 0) {
      artistsStream.write(artist);
      artist = '';
    }
  }
  artistsStream.end(() => {
    console.log(artistsCounter, 'ARTISTS CREATED')
  });

  const relatedStream = fs.createWriteStream(`./relatedList${i}.csv`);

  relatedStream.write('related_artist_ID,main_artist_ID\n');
  let relatedCounter = 0;
  for (let k = 1; k <= maxRelated; k++) {
    relatedCounter++;
    const randomArtistNumber = Math.floor(Math.random() * 1000000) + 1;
    const randomRelatedArtistNumber = Math.floor(Math.random() * 1000000) + 1;
    relatedArtist = relatedArtist + ('' +
      randomArtistNumber + ',' +
      randomRelatedArtistNumber + '\n'
    )
    if (k % 100 === 0) {
      relatedStream.write(relatedArtist);
      relatedArtist = '';
    }
  }
  relatedStream.end(() => {
    console.log(relatedCounter, 'RELATED CREATED')
  });
}



let faker = require('faker');
let fs = require('fs');


console.log('STARTING DATA GENERATION!!!!')

for (let i = 1; i <= 10; i++) {
  const artistsStream = fs.createWriteStream(`./artistsList${i}.csv`);

  artistsStream.write('artist_name,listeners,artist_image,popularSong\n');
  let artistsCounter = 0;
  let max = 100;
  for (let j = 1; j <= max; j++) {
    artistsCounter++;
    const randomPhotoNumber = Math.floor(Math.random() * 1002);
    artist = (
      faker.name.findName() + ',' + 
      faker.random.number() + ',' +
      `https://s3-us-west-1.amazonaws.com/spottyfi-photos/photos/${randomPhotoNumber}.jpeg` + ',' +
      faker.lorem.word() + '\n'
    )
    artistsStream.write(artist);
  }
  artistsStream.end(() => {
    console.log(artistsCounter, 'ARTISTS CREATED')
  });

  const relatedStream = fs.createWriteStream(`./relatedList${i}.csv`);

  relatedStream.write('related_artist_ID,main_artist_ID\n');
  let relatedCounter = 0;
  for (let k = 1; k <= max; k++) {
    relatedCounter++;
    const randomArtistNumber = Math.floor(Math.random() * 1000000) + 1
    relatedArtist = (
      randomArtistNumber + ',' +
      randomArtistNumber + '\n'
    )
    relatedStream.write(relatedArtist);
  }
  relatedStream.end(() => {
    console.log(relatedCounter, 'RELATED CREATED')
  });
}



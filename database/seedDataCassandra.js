let faker = require('faker');
let fs = require('fs');


console.log('STARTING DATA GENERATION!!!!')
let idNum = 0;

for (let i = 1; i <= 10; i++) {
  const artistsStream = fs.createWriteStream(`./artistsList${i}.csv`);

  artistsStream.write('artist_id,artist_name,listeners,artist_image,popular_song,related_artist_id,related_artist_name,related_artist_listeners,related_artist_image,related_artist_popularsong\n');
  let artistsCounter = 0;

  for (let k = 0; k < 1000000; k++) {
    
    artistsCounter++;
    idNum++;
    let artist = '';
    let maxRelatedArtists = Math.floor(Math.random() * 10) + 3
    let randomPhotoNumber = Math.floor(Math.random() * 1002);
    let artistName = faker.name.findName()
    let listeners = faker.random.number();
    let photo = `https://s3-us-west-1.amazonaws.com/spottyfi-photos/photos/${randomPhotoNumber}.jpeg`;
    let favoriteSong = faker.lorem.word();

    for (let j = 1; j <= 10; j++) {

      let randomPhotoNumberRelated = Math.floor(Math.random() * 1002);
      let relatedArtistID = j;
      let relatedArtistName = faker.name.findName()
      let relatedListeners = faker.random.number();
      let relatedPhoto = `https://s3-us-west-1.amazonaws.com/spottyfi-photos/photos/${randomPhotoNumberRelated}.jpeg`;
      let relatedFavoriteSong = faker.lorem.word();
      
      artist = artist + ('' +
        idNum + ',' +
        artistName + ',' +
        listeners + ',' +
        photo + ',' +
        favoriteSong + ',' +
        relatedArtistID + ',' +
        relatedArtistName + ',' +
        relatedListeners + ',' + 
        relatedPhoto + ',' + 
        relatedFavoriteSong + '\n'
      )
      if (j % 10 === 0) {
        artistsStream.write(artist);
        artist = '';
      }
    }
  }
  artistsStream.end(() => {
    console.log(artistsCounter, 'ARTISTS CREATED')
  });
};
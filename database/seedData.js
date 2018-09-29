let faker = require('faker');
let fs = require('fs');

const stream = fs.createWriteStream('./seedData.json');

console.log('STARTING DATA GENERATION!!!!')

stream.write('[');
const max = 1000000;
let counter = 0;
for (let i = 1; i <= max; i++) {
  console.log(max - i);
  counter++;
  const randomPhotoNumber = Math.floor(Math.random() * 1002);
  const artist = {
    artist_name: faker.name.findName(),
    listeners: faker.random.number(),
    artist_image: `https://s3-us-west-1.amazonaws.com/spottyfi-photos/photos/${randomPhotoNumber}.jpeg`,
    popularSong: faker.lorem.word(),
    relatedArtists: [],
  };
  const amountOfRelated = faker.random.number({
    min: 3,
    max: 10
  });
  for (let k = 0; k < amountOfRelated; k++) {
    const relatedArtists = {
      artist_name: faker.name.findName(),
      listeners: faker.random.number(),
      artist_image: `https://s3-us-west-1.amazonaws.com/spottyfi-photos/photos/${randomPhotoNumber}.jpeg`,
      popularSong: faker.lorem.word(),
    }
    artist.relatedArtists.push(relatedArtists)
  }
  stream.write(JSON.stringify(artist) + (i !== max ? ',' : ''));
};
stream.write(']');
stream.end(() => {
  console.log(counter, 'ARTISTS CREATED');
});

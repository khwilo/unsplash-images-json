require('dotenv').config();
const fs = require('fs');
const nodeFetch = require('node-fetch');
const path = require('path');
const { createApi } = require('unsplash-js');

const { shuffleArray } = require('./utils');

const dataDirectory = path.resolve(__dirname, '..', 'data'); // save photos JSON files here
const jsonFilePath = path.join(dataDirectory, 'photos.json');

if (!fs.existsSync(dataDirectory)) {
  fs.mkdirSync(dataDirectory);
}

// Create an instance of the Unsplash API
const unsplash = createApi({
  accessKey: process.env.ACCESS_KEY,
  fetch: nodeFetch,
});

// Search for photos
async function fetchPhotos(query, transformResult) {
  try {
    const data = await unsplash.search.getPhotos({
      query,
      page: 1,
      perPage: 10,
      orientation: 'portrait',
    });
    if (data.errors) {
      console.log('[FETCHING PHOTOS ERROR]: ', data.errors[0]);
    } else {
      const { results } = data.response;
      const output = transformResult
        ? results.map((result) => {
            return {
              id: result.id,
              description: result.description,
              alt_description: result.alt_description,
              imgThumb: result.urls.thumb,
              img: result.urls.regular,
              link: result.links.html,
              userId: result.user.id,
              userName: result.user.name,
              userLink: result.user.links.html,
              tags: result.tags.map((tag) => {
                return tag.title;
              }),
            };
          })
        : results;
      console.log(`Finished fetching ${query} photos!`);
      return output;
    }
  } catch (error) {
    console.log('[ERROR OCCURRED]: ', error);
  }
}

// Fetch various photos
async function fetchListOfVariousPhotos(queries, transform) {
  try {
    const fetchedResults = [];

    queries.forEach((query) => {
      fetchedResults.push(fetchPhotos(query, transform));
    });

    const results = await Promise.all(fetchedResults);
    const list = [].concat.apply([], results);

    const shuffledList = [...list]; // create a copy of the list of photos
    shuffleArray(shuffledList); // Shuffle the list of photos

    fs.createWriteStream(jsonFilePath).write(
      JSON.stringify(shuffledList, null, 2)
    );
  } catch (error) {
    console.log('[FETCHING VARIOUS PHOTOS ERROR]: ', error);
  }
}

fetchListOfVariousPhotos(['architecture', 'textures patterns', 'galaxy'], true);

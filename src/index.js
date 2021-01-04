require('dotenv').config();
const nodeFetch = require('node-fetch');
const { createApi } = require('unsplash-js');

// Create an instance of the Unsplash API
const unsplash = createApi({
  accessKey: process.env.ACCESS_KEY,
  fetch: nodeFetch,
});

// Search for photos
unsplash.search
  .getPhotos({
    query: 'architecture',
    page: 1,
    perPage: 10,
    orientation: 'portrait',
  })
  .then((data) => {
    if (data.errors) {
      console.log('[FETCHING PHOTOS ERROR]: ', data.errors[0]);
    } else {
      const { results } = data.response;
      console.log(JSON.stringify(results, null, 2));
      console.log(results.length);
    }
  });

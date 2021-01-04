require('dotenv').config();
const nodeFetch = require('node-fetch');
const { createApi } = require('unsplash-js');

// Create an instance of the Unsplash API
const unsplash = createApi({
  accessKey: process.env.ACCESS_KEY,
  fetch: nodeFetch,
});

// Search for photos
async function fetchPhotos(
  query,
  page = 1,
  perPage = 10,
  orientation = 'portrait',
  transformResult = false
) {
  try {
    const data = await unsplash.search.getPhotos({
      query,
      page,
      perPage,
      orientation,
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
              username: result.user.username,
              userLink: result.user.links.html,
              tags: result.tags.map((tag) => {
                return tag.title;
              }),
            };
          })
        : results;
      console.log('Fetching photos done!');
      return output;
    }
  } catch (error) {
    console.log('[ERROR OCCURRED]: ', error);
  }
}

fetchPhotos('architecture');

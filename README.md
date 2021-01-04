# unsplash-images-json

Fetch images from Unsplash and write the fetched images data to a JSON file.

## Motivation

I wanted to use a random list of specified images on a project. There are various approaches to achieve this result:

- Manually download the images and save them to disk
- Create a JSON file with the properties of the images

I decided to implement a simple logic where I fetch images from [Unsplash](https://unsplash.com/) and then write the image data to a JSON file. From the JSON file, I could easily consume the data. Using this process, I saved storage space since I wouldn't have to download the images.

## Getting started

1. Register as a developer on Unsplash from this link: <https://unsplash.com/developers>.

2. Clone this repository:

```
git clone https://github.com/khwilo/unsplash-images-json.git
```

3. Create a `.env` file and add your API access key. View the format in the `.env-sample` that is provided in the project root directory.

4. Run `yarn` or `npm install` to install the project dependencies.

5. Run `yarn start` or `npm start` to run the application.

## How to use

This project has a function called `fetchListOfVariousPhotos` that takes two arguments: *queries* and *transform*. *queries* is a list of search terms. *transform* is a boolean value. Specifying the *transform* property to the equal the value true; transforms the format of the written JSON file to the following:

<table>
  <thead>
    <tr>
      <th>Property</th>
      <th>Type</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>id</td>
      <td>string</td>
    </tr>
    <tr>
      <td>description</td>
      <td>string</td>
    </tr>
    <tr>
      <td>alt_description</td>
      <td>string</td>
    </tr>
    <tr>
      <td>imgThumb</td>
      <td>string</td>
    </tr>
    <tr>
      <td>img</td>
      <td>string</td>
    </tr>
    <tr>
      <td>link</td>
      <td>string</td>
    </tr>
    <tr>
      <td>userId</td>
      <td>string</td>
    </tr>
    <tr>
      <td>username</td>
      <td>string</td>
    </tr>
    <tr>
      <td>userLink</td>
      <td>string</td>
    </tr>
    <tr>
      <td>tags</td>
      <td>[ ] string</td>
    </tr>
  </tbody>
</table>


The saved JSON file can be found in the project **data** directory.

## TODO

- [ ] Make this project to be a CLI app

## Credits

Author: [Khwilo Kabaka](https://github.com/khwilo)

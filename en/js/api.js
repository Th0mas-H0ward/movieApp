'use strict';

const api_key = '4ed3f2476821a6ffc546f3c9c762ec65';
const imageBaseURL = 'https://image.tmdb.org/t/p/';

/**\
 * fetch data drom a server using the `url` and passes
 * the result in JSON data to a `callback` function,
 * along with an optional parameter if has `optionalParam`.
 */

const fetchDataFromServer = function (url, callback, optionalParam) {
  fetch(url)
    .then(response => response.json())
    .then(data => callback(data, optionalParam));
}

export { imageBaseURL, api_key, fetchDataFromServer };
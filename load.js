const fetch = require('node-fetch');
/**
 * Use a URL to request a Json.
 * Input a url, this function will return a promise. 
 * Callers can use then() to get the result which is in JSON format.
 * @param {*} url 
 */
function requestUrl(url) {
    return fetch(url)
    .then(resp => {
            if (!resp.ok) {
                throw new Error('Network response was not ok');
            }else {
                return resp.json();
            }
        })
    .then(data => {
       return {'url': url, 'data': data}
    })
    .catch(function(err){
        console.log(err);
        return {'url': url, 'data': null}
    });
}
/**
 * Fetch an array of URLs which contain JSON data.
 * This function will return a promise.
 * The result data in the promise is in below structure:
 * e.g.:
 * [
 *  {url: 'url1' , data: dataInJson}
 *  {url: 'url2' , data: dataInJson}
 *  ....
 * ]
 * Result order will not always follow the input urls'order.
 * 
 * This function will parallely request URLs.
 * 
 * @param {request} urls 
 */
const requestMultipleUrls = (urls) => {
    urls = Array.from(new Set(urls));
    return Promise.all(urls.map(url => requestUrl(url)));
};

module.exports = requestMultipleUrls;

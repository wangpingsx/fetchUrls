# Fetch an array of URLs which contain JSON data.

This is an implemmentation of fetching an array of URLs which contain JSON data.

The `load` function(in `load.js`) can accept an array of URLs and return a promise.

The result data in the promise is in below structure :
```
[
    {url: 'url1' , data: dataInJson}
    {url: 'url2' , data: dataInJson}
    ....
]
```

Result order will not always follow the input urls'order.

## Key things:

- The `load` function can parallely request URLs.
- The `load` function has removed duplicated URLs from the input. Don't always expect the result array length === the input URLs length.
- One URL loading failure will not stop the whole `load` function. In case of Error, the `load` function will:
    - log errors,
    - and add `null` into the result array, 
    - and move on to process the next url.

## How to run

- Install nodejs from there:  https://nodejs.org/en/ (pleas use LTS version)
- Download this project into a folder e.g. 'fetchURLs', and open the folder in terminal `cd fetchURLs`
- Then run `npm install` to install packages.
- Then you can run the project by `node main.js`

## How to run test

- Make sure you can run the project by following above steps.
- Then you can test this project by `npm test`

## Project structure

- `main.js` this is the main class to demo how to use the `load function` which fetchs an array of URLs which contain JSON data
- `load.js` has the implementation which fetchs URLs
- `load.test.js` is the test.

## TODO

Several things can be improved, they are:

- Finish `eslint`, `prettier` and IDE integration
- `load.js` already removed url duplications, but can do better e.g. `a.com/` and `a.com` should be considered duplication which is not right now.
- `load.js` can have a internal cache (with limited size and expire time). The cache can cache all fetched URLs and reuse them later.
- `load.js` should later support retry.
- `load.js` should support auth.

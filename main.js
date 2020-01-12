const requestMultipleUrls = require('./load');
const urls = [
    'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/ftse-fsi.json',
    'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-hkd.json',
    'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-usd.json',
    'xxxxxxx'
];

requestMultipleUrls(urls).then(urlContent => {
    console.log(urlContent);
});

[![NPM Badge](https://nodei.co/npm/google-scraper.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/google-scraper)

# GoogleScraper.js [![Circle CI](https://circleci.com/gh/jsnomad/Google-Scraper.svg?style=svg)](https://circleci.com/gh/jsnomad/Google-Scraper) [![Dependency Status](https://david-dm.org/jsnomad/Google-Scraper.svg)](https://david-dm.org/jsnomad/Google-Scraper)

GoogleScraper is a nodejs module to extract links from Google SERP.

## Download
The source is available for download from
[GitHub](https://github.com/jsnomad/Google-Scraper).
Alternatively, you can install using Node Package Manager (npm):
<pre>
  npm install google-scraper
</pre>

## Example

```javascript
const Scraper = require('google-scraper');

const options = {
  keyword: "javascript",
  language: "fr",
  tld:"fr",
  results: 100
};

const scrape = new Scraper.GoogleScraper(options);

scrape.getGoogleLinks.then(function(value) {
  console.log(value);
}).catch(function(e) {
  console.log(e);
})
```

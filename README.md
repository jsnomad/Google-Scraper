# GoogleScraper.js

GoogleScraper is a nodejs module allowing extract links from Google SERP.

## Example

```javascript
var scraper = require('google-scraper');

var options = {
  keyword : "javascript",
  language : "fr",
  results : 100
};

var scrape = new scraper.GoogleScraper(options);

scrape.getGoogeLinks(function(arrayLink){
  console.log(arrayLink);
});
```
# GoogleScraper.js

GoogleScraper is a nodejs module allowing extract links from Google SERP.

## Download
The source is available for download from
[GitHub](https://github.com/code4funFr/Google-Scraper).
Alternatively, you can install using Node Package Manager (npm):
<pre>
  npm install google-scraper
</pre>

## Example

```javascript
var scraper = require('google-scraper');

var options = {
  keyword : "javascript",
  language : "fr",
  results : 100
};

var scrape = new scraper.GoogleScraper(options);

scrape.getGoogleLinks(function(arrayLink){
  console.log(arrayLink);
});
```
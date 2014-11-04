var assert = require("assert");

var scraper = require('google-scraper');

var options = {
  keyword : "javascript",
  language : "en",
  results : 100
};

var scrape = new scraper.GoogleScraper(options);

describe('getGoogleLinks()', function(){
    it('There are links', function(done){

    scrape.getGoogleLinks(function(arrayLink){
      	var value = (arrayLink.length > 0 ? true : false);
		assert(value, 'Good');
	  	done();
	});

  })
})
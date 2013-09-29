var request = require('request')
,async = require('async')
,cheerio = require('cheerio');

var arrayLinks = [];

/*
*PARAMETERS : {keyword : '', language : '', results : ''}
*/
function GoogleScraper(options){
  this.options = options;
};
exports.GoogleScraper = GoogleScraper;

GoogleScraper.prototype.getGoogleLinks = function(callback){
  var self = this
  ,html;

  async.series([
    function(callback) {
      self._getHtml(function(data){
        html=data;
        callback();
      })
    },
    function(callback) {
      self._extractLink(html,function(){
        callback();
      })
    }
    ], function(err) {
      if (err) return next(err);
      callback(arrayLinks);
    });
}

/*
 * INTERNAL UTILITY FUNCTIONS
 */
 //TODO : EXCEPTION HANDLING
 GoogleScraper.prototype._getHtml = function(callback){
   request('http://www.google.fr/search?hl='+this.options.language+'&num='+this.results+'&q='+this.options.keyword, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      callback(body);
    }
  })
 }

 GoogleScraper.prototype._extractLink = function(html, callback){
  var $ = cheerio.load(html);
  var links = $('h3.r a');
  $(links).each(function(i, link){
    var linkClean = $(link).attr('href').match("(?=http).*(?=&sa)");
    if(linkClean !== null){
      arrayLinks.push(linkClean[0]);
    }
  })
  callback();
}
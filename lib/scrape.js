'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GoogleScraper = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GoogleScraper = exports.GoogleScraper = function () {
  function GoogleScraper(options) {
    _classCallCheck(this, GoogleScraper);

    this.options = options;
  }

  _createClass(GoogleScraper, [{
    key: 'getHtml',
    value: function getHtml() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        (0, _request2.default)('http://www.google.fr/search?hl=' + _this.options.language + '&num=' + _this.options.results + '&q=' + _this.options.keyword, function (err, res, body) {
          if (err) {
            return reject(err);
          } else if (res.statusCode !== 200) {
            var error = new Error('Unexpected status code: ${res.statusCode}');
            error.res = res;
            return reject(error);
          }
          resolve(body);
        });
      });
    }
  }, {
    key: 'extractLink',
    value: function extractLink(html) {
      var arrayLinks = [];
      var $ = _cheerio2.default.load(html);
      $('h3.r a').each(function (i, link) {
        var linkClean = $(link).attr('href').match('(?=http|https).*(?=&sa)');
        if (linkClean !== null) {
          arrayLinks.push(linkClean[0]);
        }
      });
      return arrayLinks;
    }
  }, {
    key: 'getGoogleLinks',
    get: function get() {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        _this2.getHtml().then(function (body) {
          return resolve(_this2.extractLink(body));
        }).catch(function (err) {
          return reject(err);
        });
      });
    }
  }]);

  return GoogleScraper;
}();
import request from 'request'
import cheerio from 'cheerio'
import * as config from '../config'

export default class GoogleScraper {

  constructor(options) {
    this.options = options;
  }

  get getGoogleLinks() {
    return new Promise((resolve, reject) => {
      this.getHtml().then((body) => {
        return resolve(this.extractLink(body))
      }).catch((err) => {
        return reject(err);
      })
    })
  }

  getHtml() {
    const option = {
      url: config.urlSearch(this.options.tld, this.options.language, this.options.results, this.options.keyword),
    }
    return new Promise((resolve, reject) => {
      request(option, (err, res, body) => {
        if (err) {
          return reject(err)
        } else if (res.statusCode !== 200) {
          const error = new Error(`Unexpected status code: ${res.statusCode}`)
          error.res = res
          return reject(error)
        }
        return resolve(body)
      })
    })
  }

  extractLink(html) { // eslint-disable-line class-methods-use-this
    const arrayLinks = [];
    const $ = cheerio.load(html);
    $('h3.r a').each((i, link) => {
      const linkClean = $(link).attr('href').match('(?=http|https).*(?=&sa)')
      if (linkClean) {
        arrayLinks.push(linkClean[0]);
      }
    })
    return arrayLinks;
  }

}

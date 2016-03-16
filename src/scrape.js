import request from 'request'
import cheerio from 'cheerio'

export class GoogleScraper {
  constructor(options) {
    this.options = options;
  }

  get getGoogleLinks() {
    return new Promise((resolve, reject) => {
      this.getHtml().then(body => {
        return resolve(this.extractLink(body))
      }).catch(err => {
        return reject(err);
      })
    })
  }

  getHtml() {
    return new Promise((resolve, reject) => {
      request(`http://www.google.fr/search?hl=${this.options.language}&num=${this.options.results}&q=${this.options.keyword}`, (err, res, body) => {
        if (err) {
          return reject(err)
        } else if (res.statusCode !== 200) {
          const error = new Error('Unexpected status code: ${res.statusCode}')
          error.res = res
          return reject(error)
        }
        resolve(body)
      })
    })
  }

  extractLink(html) {
    const arrayLinks = [];
    const $ = cheerio.load(html);
    $('h3.r a').each((i, link) => {
      const linkClean = $(link).attr('href').match('(?=http|https).*(?=&sa)')
      if (linkClean !== null) {
        arrayLinks.push(linkClean[0]);
      }
    })
    return arrayLinks;
  }

}

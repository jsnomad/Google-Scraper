import { GoogleScraper } from '../index'
import { expect, should } from 'chai'

const options = {
  keyword: "javascript",
  language: "fr",
  results: 100
};

const scrape = new GoogleScraper(options);
should()

describe('Get google links', () => {
  it('should get at least 1 link', (done) => {
    scrape.getGoogleLinks.then((value) => {
      expect(value.length).to.be.at.least(1);
    })
    done()
  })
})

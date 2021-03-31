const server = require('./server')
const request = require('supertest')
const cheerio = require('cheerio')

test('tests work!', () => {
  expect(1).toBe(1)
})

//Test that the the home page loads, and that it is a h1 header tag
test('Make sure the home page loads', (done) => {
  const expected = "StevesArt"
  
  request(server)
    .get('/')
    .end((err, res) => {
      expect(err).toBeNull()
      expect(res.status).toEqual(200)
      expect(res.text).toContain("StevesArt")

      const $ = cheerio.load(res.text)
      const actual = $('h1').text()
      
      expect(actual).toEqual(expected)
      done()
    })
})

test('/buyArtPage displays more than 3 pictures', (done) => {
  const expected = 3

  request(server)
    .get('/buyArtPage')
    .end((err, res) => {
      expect(err).toBeNull()
      expect(res.status).toEqual(200)

      const $ = cheerio.load(res.text)
      const actual = $('.imagesBuyArtPage').length

      expect(actual).toBeGreaterThanOrEqual(expected)
      done()
    })
})
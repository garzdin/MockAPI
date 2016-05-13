var news = require('../data/news') // import the news data

module.exports = function(request, response) { // the default news module export
  return response.send(news) // send the news as the response
}

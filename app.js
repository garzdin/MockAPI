var express = require('express') // import expressjs
var config = require('./config') // import the config
var app = express() // bootstrap the application
var news = require('./routes/news') // the news module
var categories = require('./routes/categories') // the categories module
var events = require('./routes/events') // the events module
var login = require('./routes/login') // the login module
var images = require('./routes/images') // the images module

app.use(function(request, response, next) { // middleware for default headers
  response.setHeader('Content-Type', 'application/json') // set Content-Type header
  next() // proceed
})

app.get('/', function(request, response) { // index route
  response.send({ message: "Hello to the API" }) // display a message
})

app.get('/news', news) // the news route
app.get('/categories', categories) // the categories route
app.get('/categories/:id', categories.single) // a single categorie route
app.get('/categoryItems/:id', categories.categoryItems) // a single categoryItems route
app.get('/events', events) // the events route
app.get('/events/:id', events.single) // a single event route
app.get('/login', login) // the login route
app.get('/images/:id', images) // the images route

app.use(function(error, request, response, next) { // middleware for error reporting
  response.send(error) // display the passed error's code and message
})

app.listen(config.port, config.host, function() { // start the application on the specified port and host
  console.log('Bella Exhibition API running on ' + config.host + ':' + config.port + '\nPress Ctrl+C to stop') // display a message, whent the application is running
})

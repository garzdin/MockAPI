var events = require('../data/events') // import the events data

module.exports = function(request, response) { // the default events module export
  return response.send(events) // return the events as the response
}

module.exports.single = function(request, response, next) { // a single event module export
  for(var i = 0; i < events.length; i++) { // iterate over the events
    if(events[i].id == request.params.id) { // if the event's id matches the requested even's id
      return response.send(events[i]) // return the events as the response
    }
  }
  var error = new Error() // construct an Error object
  error.status = 404 // set the error's status as 404 not found
  error.message = "Event not found." // set the error's message
  return next(error) // pass the error to the error handling middleware
}

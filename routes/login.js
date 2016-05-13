var users = require('../data/users') // import the user data

module.exports = function(request, response, next) { // the default users module export
  if(!request.query.email || !request.query.password) { // if there's no email or password in the request
    var error = new Error() // construct an Error object
    error.status = 401 // set the error's status as 401 unauthorized
    error.message = "No email and password provided." // set the message of the error
    return next(error) // pass the error to the error handling middleware
  }
  for(var i = 0; i < users.length; i++) { // iterate over the users
    if(users[i].email == request.query.email && users[i].password == request.query.password) { // if the user matches an entry in the data
      return response.send({ // return the user's data as the response
        id: users[i].id, // the user's id
        name: users[i].name, // the user's name
        email: users[i].email, // the user's email
        createdDate: users[i].createdDate, // the user's creation date
        location: users[i].location // the user's location
      })
    }
  }
  var error = new Error() // construct an Error object
  error.status = 401 // set the error's status as 401 unauthorized
  error.message = "Wrong credentials." // set the message of the error
  return next(error) // pass the error to the error handling middleware
}

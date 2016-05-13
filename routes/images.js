var fs = require('fs') // import the file system module
var jimp = require('jimp') // import the jimp module for image processing
var config = require('../config') // import the config
var images = __dirname.replace('/routes', '') + '/data/images/' // the default directory for the images

module.exports = function(request, response, next) { // the images default module export
  fs.exists(images + request.params.id + '.' + config.extension, function(exists) { // check if file exists
    if(!exists) { // if it doesn't exist
      var error = new Error() // construct an Error object
      error.status = 404 // set the status of the error as 404 not found
      error.message = "File not found." // set the message of the error
      return next(error) // pass the error to the error handling middleware
    }
    fs.readFile(images + request.params.id + '.' + config.extension, function(error, data) { // open and read the file
      if(error) { // if there's an error
        return next(error) // pass the error to the error handling middleware
      }
      response.set({ // set the response headers
        'Content-Type': 'image/' + config.extension, // set the Content-Type header
        'Content-Length': data.length // set the Content-Length header
      })
      if(request.query.width) { // if width is provided, resize
        if(!request.query.height) { // if there's not height provided
          request.query.height = jimp.AUTO //set the height to auto
        }
        jimp.read(data, function(error, image) { // read the image data
          if(error) { // if there's an error
            return next(error) // pass the error to the error handling middleware
          }
          image.contain(Number(request.query.width), Number(request.query.height), function(error, image) { // resize the image
            if(error) { // if there's an error
              return next(error) // pass the error to the error handling middleware
            }
            image.getBuffer('image/' + config.extension, function(error, image) { // get the image buffer
              if(error) { // if there's an error
                return next(error) // pass the error to the error handling middleware
              }
              return response.send(image) // return the image buffer as the response
            })
          })
        })
      } else {
        return response.send(data) // return the image as the response
      }
    })
  })
}

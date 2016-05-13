var categories = require('../data/categories') // import the categories data

module.exports = function(request, response) { // default module export
  var filteredCategories = []; // array to store the categories, without some fields
  for(var i = 0; i < categories.length; i++) { // iterate over the categories
    if(categories[i].categoryItems) { // if the current category has categoryItems
      var categoryItems = []; // array to store the categoryItems
      for(var j = 0; j < categories[i].categoryItems.length; j++) { // iterate over the categoryItems
        categoryItems.push({ // push the category in the categoryItems array
          id: categories[i].categoryItems[j].id, // add the id to the object
          name: categories[i].categoryItems[j].name, // add the name to the object
          imageId: categories[i].categoryItems[j].imageId, // add the imageId to the object
          location: categories[i].categoryItems[j].location, // add the location to the object
          exhibitorName: categories[i].categoryItems[j].exhibitorName, // add the exhibitorName to the object
        })
      }
    }
    filteredCategories.push({ // push the category to the filteredCategories array
      id: categories[i].id, // add the category id
      name: categories[i].name, // add the category name
      categoryItems: categoryItems // add the filtered categoryItems
    })
  }
  return response.send(filteredCategories) // return the array and send it as the response
}

module.exports.single = function(request, response, next) { // a single category module export
  for(var i = 0; i < categories.length; i++) { // iterate over the categories
    if(categories[i].id == request.params.id) { // if the category id matches the requested category id
      var categoryItems = []; // array to store the categoryItems
      for(var j = 0; j < categories[i].categoryItems.length; j++) { // iterate over the categoryItems
        categoryItems.push({ // push the category in the categoryItems array
          id: categories[i].categoryItems[j].id, // add the id to the object
          name: categories[i].categoryItems[j].name, // add the name to the object
          imageId: categories[i].categoryItems[j].imageId, // add the imageId to the object
          location: categories[i].categoryItems[j].location, // add the location to the object
          exhibitorName: categories[i].categoryItems[j].exhibitorName, // add the exhibitorName to the object
        })
      }
      return response.send({ // return the category and send it as the response
        id: categories[i].id, // the category id
        name: categories[i].name, // the category name
        categoryItems: categoryItems // the filtered category items
      })
    }
  }
  var error = new Error() // construct an Error object
  error.status = 404 // set the status of the error as 404 not found
  error.message = "Categorie not found." // set the message of the error
  return next(error) // pass the error to the error handling middleware
}

module.exports.categoryItems = function(request, response, next) { // a single categoryItem module export
  for(var i = 0; i < categories.length; i++) { // iterate over the categories
    if(categories[i].categoryItems) { // if the category has any category items
      for(var j = 0; j < categories[i].categoryItems.length; j++) { // iterate over the CategorieItems
        if(categories[i].categoryItems[j].id == request.params.id) { // if the categoryItem's id matches the requested categoryItem id
          return response.send(categories[i].categoryItems[j]) // return the matching category items as the response
        }
      }
    }
  }
  var error = new Error() // construct an Error object
  error.status = 404 // set the status of the error as 404 not found
  error.message = "CategorieItem not found." // set the message of the error
  return next(error) // pass the error to the error handling middleware
}

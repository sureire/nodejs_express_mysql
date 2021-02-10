const Category = require("../models/category.model.js");

// Create and Save a new User
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a location
    const category = new Category({
      category: req.body.category,
      subcategory: req.body.subcategory,
    });
  
    // Save location in the database
    Category.create(category, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Category."
        });
      else res.send(data);
    });
  };
  
  // Retrieve all Users from the database.
  exports.findcategory = (req, res) => {
    Category.findcategory((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving all Category."
        });
      else res.send(data);
    });
  };

  exports.findAllSubcategory = (req, res) => {
    Category.findAllSubcategory((err, data) => {
        if (err) 
             res.status(500).send({
                message: "Error retrieving subcategories " + req.params.city
              });
         else res.send(data);
    });
  };

  exports.findSubcategory = (req, res) => {
    Category.findSubCategoryfor(req.params.category, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found with Category. ${req.params.category}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving with Category. " + req.params.category
          });
        }
      } else res.send(data);
    });
  };

  exports.delete = (req, res) => {
    Category.remove(req.params.category, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found servicecategory with category ${req.params.category}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete servicecategory with category " + req.params.category
          });
        }
      } else res.send({ message: `servicecategory was deleted successfully!` });
    });
  };
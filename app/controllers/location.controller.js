const Location = require("../models/locations.model.js");

// Create and Save a new User
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a location
    const location = new Location({
      city: req.body.city,
      area: req.body.area,
    });
  
    // Save location in the database
    Location.create(location, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Location."
        });
      else res.send(data);
    });
  };
  
  // Retrieve all Users from the database.
  exports.AllCities = (req, res) => {
    Location.getcities((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving all Cities."
        });
      else res.send(data);
    });
  };

  exports.AllAreas = (req, res) => {
    Location.getarea(req.params.city, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found Area for City. ${req.params.city}.`
              });
            } else {
              res.status(500).send({
                message: "Error retrieving area for city " + req.params.city
              });
            }
          } else res.send(data);
    });
  };
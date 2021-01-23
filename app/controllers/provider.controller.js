const Provider = require("../models/provider.model.js");

// Create and Save a new User
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    const provider = new Provider({
      email: req.body.email,
      name: req.body.name,
      mobile: req.body.mobile
    });
  
    // Save Provider in the database
    Provider.create(provider, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Provider."
        });
      else res.send(data);
    });
  };
  
  // Retrieve all Users from the database.
  exports.findAll = (req, res) => {
    Provider.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Providers."
        });
      else res.send(data);
    });
  };
  
  // Find a single User with a customerId
  exports.findProvider = (req, res) => {
    Provider.findByMobile(req.params.mobile, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Provider with Mobile No. ${req.params.mobile}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Provider with Mobile No. " + req.params.mobile
          });
        }
      } else res.send(data);
    });
  };
  
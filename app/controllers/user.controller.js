const User = require("../models/users.model.js");

// Create and Save a new User
exports.createUser = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a User
  const user = new User({
    email: req.body.email,
    name: req.body.name,
    mobile: req.body.mobile,
    usertype: req.body.usertype
  });

  // Save User in the database
  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    else res.send(data);
  });
};

// Retrieve all Users from the database.
exports.findAllUsers = (req, res) => {
  User.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Users."
      });
    else res.send(data);
  });
};

// Find a single User with a customerId
exports.findUser = (req, res) => {
  User.findByMobile(req.params.mobile, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with Mobile No. ${req.params.mobile}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with Mobile No. " + req.params.mobile
        });
      }
    } else res.send(data);
  });
};


// Delete a User with the specified customerId in the request
exports.deleteUser = (req, res) => {
  User.remove(req.params.mobile, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with Mobile No.  ${req.params.mobile}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete User with Mobile No. " + req.params.mobile
        });
      }
    } else res.send({ message: `User was deleted successfully!` });
  });
};

// Delete all Customers from the database.
exports.deleteAllUser = (req, res) => {
  User.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all customers."
      });
    else res.send({ message: `All Customers were deleted successfully!` });
  });
};

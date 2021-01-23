const Services = require("../models/services.model.js");

exports.create = (req,res) => {
        // Validate request
        if (!req.body) {
            res.status(400).send({
              message: "Content can not be empty!"
            });
          }

        const service = new Services({
        name: req.body.name,
        category: req.body.category,
        location: req.body.location,
        providerid: req.body.providerid
        });

        Services.create(service, (err,data) => {
            if (err)
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the Category."
            });
            else res.send(data);
        });

    };

    exports.findServicebyProvider = (req, res) => {
        Services.findServicebyProvider(req.params.providerid, (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found with Providerid. ${req.params.providerid}.`
              });
            } else {
              res.status(500).send({
                message: "Error retrieving with Providerid. " + req.params.providerid
              });
            }
          } else res.send(data);
        });
      };

      exports.findServicebyCategory = (req, res) => {
        Services.findServicebyCategory(req.params.category, (err, data) => {
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

      exports.findServicebyLocation = (req, res) => {
        Services.findServicebyLocation(req.params.location, (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found with Location. ${req.params.location}.`
              });
            } else {
              res.status(500).send({
                message: "Error retrieving with Location. " + req.params.location
              });
            }
          } else res.send(data);
        });
      };

      exports.findServicebyLoc_cat = (req, res) => {
        Services.findServicebyLoc_cat(req.params.location, req.params.category, (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found with Location. ${req.params.location}.`
              });
            } else {
              res.status(500).send({
                message: "Error retrieving with Location. " + req.params.location
              });
            }
          } else res.send(data);
        });
      };


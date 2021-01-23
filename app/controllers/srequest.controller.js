const SRequest = require("../models/srequest.model.js");

exports.create =  (req,res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }

    const srequest = new SRequest({
    userid: req.body.userid,
    serviceid: req.body.serviceid,
    requestdate: req.body.requestdate,
    status: req.body.status,
    preferedtimeslot: req.body.preferedtimeslot,
    emergency: req.body.emergency
    });

    SRequest.create(srequest, (err,data) => {
        if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the SRequest."
        });
        else res.send(data);
    });

};

exports.findbyStatus = (req, res) => {
    SRequest.findbyStatus(req.params.status, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found for status. ${req.params.status}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving for status. " + req.params.status
          });
        }
      } else res.send(data);
    });
  };

  exports.findbyProvider = (req, res) => {
    SRequest.findbyProvider(req.params.providerid, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found for providerid. ${req.params.providerid}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving for providerid. " + req.params.providerid
          });
        }
      } else res.send(data);
    });
  };

  exports.findbyService = (req, res) => {
    SRequest.findbyService(req.params.serviceid, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found for serviceid. ${req.params.serviceid}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving for serviceid. " + req.params.serviceid
          });
        }
      } else res.send(data);
    });
  };

  exports.findbyUserid = (req, res) => {
    SRequest.findbyUserid(req.params.userid, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found for serviceid. ${req.params.userid}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving for serviceid. " + req.params.userid
          });
        }
      } else res.send(data);
    });
  };

  exports.bookinglist = (req, res) => {
    SRequest.bookinglist((err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found for booklinglist`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving for booklinglist"
          });
        }
      } else res.send(data);
    });
  };

  exports.Update = (req, res) => {
      console.log(req.params.id);
      console.log(req.body);
    SRequest.Update(req.params.id,new SRequest(req.body), (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found for providerid. ${req.params.providerid}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving for providerid. " + req.params.providerid
          });
        }
      } else res.send(data);
    });
  };


module.exports = app => {
    const provider = require("../controllers/provider.controller.js");
    const db = require("../models/db.js");
  
    // Create a new Customer
    app.post("/provider", provider.create);
  
    // Retrieve all Customers
    app.get("/providers", provider.findAll);
  
    // Retrieve a single Customer with customerId
    app.get("/providers/:mobile", provider.findProvider);
  
    app.put("/provider", (req,res) => {
      console.log(req.body);
      let sql = `update provider set walletbalance = ${req.body.amount} where id = ${req.body.id}`;
      db.query(sql, (err, data) => {
        if (err){
          console.log(err);
          res.status(500).send({
              message: 'Error updating provider..'
          });
        }
        else 
            res.status(200).send(data);        
      });
    });
 
    app.get("/provider/:id", (req,res) => {
      let sql = `select * from provider where id = ${req.params.id}`;
      db.query(sql, (err, data) => {
        if (err){
          console.log(err);
          res.status(500).send({
              message: 'Error getting provider..'
          });
        }
        else 
            res.status(200).send(data[0]);        
      });
    });

    app.get("/provider_inactive", (req,res) => {
      let sql = `select * from provider where active = 0`;
      db.query(sql, (err, data) => {
        if (err){
          console.log(err);
          res.status(500).send({
              message: 'Error getting provider..'
          });
        }
        else 
            res.status(200).send(data);        
      });
    });

    app.put("/provider_activate", (req,res) => {
      console.log(req.body);
      let sql = `update provider set active = 1 where id = ${req.body.id}`;
      db.query(sql, (err, data) => {
        if (err){
          console.log(err);
          res.status(500).send({
              message: 'Error updating provider..'
          });
        }
        else 
            res.status(200).send(data);        
      });
    });

  };
  
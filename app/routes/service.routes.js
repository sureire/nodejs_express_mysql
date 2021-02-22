module.exports = app => {
    const service = require("../controllers/services.controller.js");
    const db = require("../models/db.js");
  
    app.post("/service", service.create);
  
    app.get("/services/:providerid", service.findServicebyProvider);
  
    app.get("/sercategory/:category", service.findServicebyCategory);

    app.get("/serlocation/:location", service.findServicebyLocation);

    app.get("/serbyloccat/:location/:category", service.findServicebyLoc_cat);

    app.get("/allservices", (req,res) => {
      let sql = 'select a.name servicename, a.category, a.location, b.name, b.mobile from services a, provider b where a.providerid = b.id';
      db.query(sql, (err, data) => {
        if (err){
          console.log(err);
          res.status(500).send({
              message: 'Error getting services..'
          });
        }
        else 
            res.status(200).send(data);        
      });
    });

    app.get("/servicedupcheck/:id/:location/:category", (req,res) => {
      let sql = `select count(*) cnt from services where providerid = ${req.params.id} and location = '${req.params.location}' and category = '${req.params.category}'`;
      console.log(sql);
      db.query(sql, (err, data) => {
          if (err){
              console.error(err);
              res.status(500).send({
                  message: 'Error in service duplicate check'
              });
          }
          else
              res.status(200).send(data[0]);
      });
    });
  
  };
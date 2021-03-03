module.exports = app => {
    const srequest = require("../controllers/srequest.controller.js");
    const db = require("../models/db.js");
  
    app.post("/srequest", srequest.create);
  
    app.get("/srequest/:status", srequest.findbyStatus);
  
    app.get("/srequest/:providerid", srequest.findbyProvider);

    app.get("/srequest/:serviceid", srequest.findbyService);

    app.get("/srequest_user/:userid", srequest.findbyUserid);

    app.get("/srequest_bookinglist/:providerid", srequest.bookinglist);

    app.put("/srequest/:id", srequest.Update);

    // app.put("/sreqreset/:id", (req, res) => {
    //     let sql = `update servicerequest set status = `
    // } );

    app.get("/cancelledreq", (req,res) => {
        let sql = "select a.id, b.name Engineer, a.category, a.location, d.name CustomerName, c.statusdescription CancelReason, b.id engineerid, '0' as refund, walletbalance from servicerequest a, provider b, servicestatus c, users d" + 
                " where a.serviceprovider = b.id and a.id= c.requestid and a.userid= d.id and a.status = 'cancelling' and c.status = 'cancelling'";
        db.query(sql, (err, data) => {
          if (err){
            console.log(err);
            res.status(500).send({
                message: 'Error getting cancelledreq..'
            });
          }
          else 
              res.status(200).send(data);        
        });
      });

      app.get("/dealersr/:id", (req,res) => {
          console.log(req.params.id)
        let sql = `call dealerserviceslist(${req.params.id})`;
        db.query(sql, (err, data) => {
          if (err){
            console.log(err);
            res.status(500).send({
                message: 'Error getting dealersr..'
            });
          }
          else 
              res.status(200).send(data[0]);        
        });
      });

      app.get("/srequestdupcheck/:userid/:location/:category", (req,res) => {
        let sql = `select count(*) cnt from servicerequest where userid = ${req.params.userid} and location = '${req.params.location}' and category = '${req.params.category}'`
            sql += ` and status in ('pending','in progress','cancelling')`;
        console.log(sql);
        db.query(sql, (err, data) => {
            if (err){
                console.error(err);
                res.status(500).send({
                    message: 'Error in service request duplicate check'
                });
            }
            else
                res.status(200).send(data[0]);
        });
      });

      app.get("/opencalls/:id", (req,res) => {
        let sql = `select count(*) cnt from servicerequest where serviceprovider = ${req.params.id} and status in ('in progress','cancelling')`;
        db.query(sql, (err, data) => {
            if (err){
                console.error(err);
                res.status(500).send({
                    message: 'Error in getting opencalls..'
                });
            }
            else
                res.status(200).send(data[0]);
        });
      });

      app.get("/totalserviceperday/:id",(req,res) => {
          let sql = `call servicecountperday(${req.params.id})`;
          db.query(sql, (err,data) => {
            if (err){
                console.error(err);
                res.status(500).send({
                    message: 'Error in getting totalserviceperday..'
                });
            }
            else
                res.status(200).send(data[0][0]);            
          });
      });

      app.get("/servicelist",(req,res) => {
        let sql = `call servicerequest_all()`;
        db.query(sql, (err,data) => {
          if (err){
              console.error(err);
              res.status(500).send({
                  message: 'Error in getting servicerequest_all..'
              });
          }
          else
              res.status(200).send(data[0]);            
        });
    });

    app.get("/servicereport/:fromdate/:todate/:status/:city/:dealer",(req,res) => {
        let sql = `call servicereport('${req.params.fromdate}','${req.params.todate}'`;
        sql += req.params.status == 'null'? `,null`: `,'${req.params.status}'`;
        sql += req.params.city == 'null'? `,null`: `,'${req.params.city}'`;
        sql += req.params.dealer == 'null'? `,null`: `,'${req.params.dealer}'`;
        sql += ')';
        console.log(sql);
        db.query(sql, (err,data) => {
          if (err){
              console.error(err);
              res.status(500).send({
                  message: 'Error in getting servicereport..'
              });
          }
          else
              res.status(200).send(data[0]);            
        });
    });
};
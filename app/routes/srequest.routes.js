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

    app.get("/cancelledreq", (req,res) => {
        let sql = "select a.id, b.name Engineer, a.category, a.location, d.name CustomerName, c.statusdescription CancelReason, b.id engineerid, walletbalance from servicerequest a, provider b, servicestatus c, users d" + 
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

};
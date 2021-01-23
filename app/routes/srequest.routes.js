module.exports = app => {
    const srequest = require("../controllers/srequest.controller.js");
  
    app.post("/srequest", srequest.create);
  
    app.get("/srequest/:status", srequest.findbyStatus);
  
    app.get("/srequest/:providerid", srequest.findbyProvider);

    app.get("/srequest/:serviceid", srequest.findbyService);

    app.get("/srequest_user/:userid", srequest.findbyUserid);

    app.get("/srequest_bookinglist", srequest.bookinglist);

    app.put("/srequest/:id", srequest.Update);

};
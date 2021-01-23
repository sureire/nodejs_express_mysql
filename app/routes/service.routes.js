module.exports = app => {
    const service = require("../controllers/services.controller.js");
  
    app.post("/service", service.create);
  
    app.get("/services/:providerid", service.findServicebyProvider);
  
    app.get("/sercategory/:category", service.findServicebyCategory);

    app.get("/serlocation/:location", service.findServicebyLocation);

    app.get("/serbyloccat/:location/:category", service.findServicebyLoc_cat);
  
  };
module.exports = app => {
    const location = require("../controllers/location.controller.js");
  
    // Create a new Customer
    app.post("/location", location.create);
  
    // Retrieve all Customers
    app.get("/cities", location.AllCities);
  
    // Retrieve a single Customer with customerId
    app.get("/areas/:city", location.AllAreas);
  
    app.delete("/location/:city", location.delete);
  };
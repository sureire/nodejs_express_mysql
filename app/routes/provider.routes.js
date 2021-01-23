module.exports = app => {
    const provider = require("../controllers/provider.controller.js");
  
    // Create a new Customer
    app.post("/provider", provider.create);
  
    // Retrieve all Customers
    app.get("/providers", provider.findAll);
  
    // Retrieve a single Customer with customerId
    app.get("/providers/:mobile", provider.findProvider);
  
    // // Update a Customer with customerId
    // app.put("/customers/:customerId", customers.update);
 

  };
  
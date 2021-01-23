module.exports = app => {
    const category = require("../controllers/category.controller.js");
  
    // Create a new Customer
    app.post("/category", category.create);
  
    // Retrieve all Customers
    app.get("/categories", category.findcategory);
  
    // Retrieve a single Customer with customerId
    app.get("/subcategories", category.findAllSubcategory);
  
    app.get("/subcategories/:category", category.findSubcategory);

  };
  
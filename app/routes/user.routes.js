module.exports = app => {
    const user = require("../controllers/user.controller.js");
  
    // Create a new Customer
    app.post("/user", user.createUser);
  
    // Retrieve all Customers
    app.get("/users", user.findAllUsers);
  
    // Retrieve a single Customer with customerId
    app.get("/users/:mobile", user.findUser);
  
    // // Update a Customer with customerId
    // app.put("/customers/:customerId", customers.update);
  
    // Delete a Customer with customerId
    app.delete("/users/:mobile", user.deleteUser);
  
    // Create a new Customer
    app.delete("/users", user.deleteAllUser);
  };
  
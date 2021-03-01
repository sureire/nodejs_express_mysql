module.exports = app => {
    const user = require("../controllers/user.controller.js");
    const db = require("../models/db.js");
  
    // Create a new Customer
    app.post("/user", user.createUser);
  
    // Retrieve all Customers
    app.get("/users", user.findAllUsers);
  
    // Retrieve a single Customer with mobile
    app.get("/users/:mobile", user.findUser);
  
    // // Update a Customer with customerId
    // app.put("/customers/:customerId", customers.update);
  
    // Delete a Customer with mobile
    app.delete("/users/:mobile", user.deleteUser);
  
    app.delete("/users", user.deleteAllUser);

    //get all the dealers
    app.get("/dealerlist",(req,res) => {
      let sql = 'select * from users where usertype = 2';
      db.query(sql, (err,data) => {
        if (err){
            console.error(err);
            res.status(500).send({
                message: 'Error in getting dealerlist..'
            });
        }
        else
            res.status(200).send(data);            
      });
  });

  };
  
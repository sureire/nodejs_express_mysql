const sql = require("./db.js");

// constructor
const Provider = function(provider) {
  this.email = provider.email;
  this.name = provider.name;
  this.mobile = provider.mobile;
  this.address = provider.address;
};

Provider.create = (newProvider, result) => {
    sql.query("INSERT INTO provider SET ?", newProvider, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created Provider: ", { id: res.insertId, ...newProvider });
      result(null, { id: res.insertId, ...newProvider });
    });
  };
  
  Provider.findByMobile = (mobile, result) => {
    sql.query(`SELECT * FROM provider WHERE active = 1 and mobile = ${mobile}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found Provider: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found User with the id
      result({ kind: "not_found" }, null);
    });
  };
  

  Provider.getAll = result => {
    sql.query("SELECT * FROM provider", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("Provider: ", res);
      result(null, res);
    });
  };


  module.exports = Provider;
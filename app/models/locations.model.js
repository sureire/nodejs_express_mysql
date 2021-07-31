const sql = require("./db.js");

// constructor
const Location = function(loc) {
  this.city = loc.city;
  this.area = loc.area;
};

Location.create = (newLocation, result) => {
  sql.query("INSERT INTO location SET ?", newLocation, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created location: ", { id: res.insertId, ...newLocation });
    result(null, { id: res.insertId, ...newLocation });
  });
};

Location.findBy = (city, result) => {
  sql.query(`SELECT * FROM location WHERE city = ${city}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found City: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found User with the id
    result({ kind: "not_found" }, null);
  });
};

Location.getAll = result => {
  sql.query("SELECT * FROM location", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Location: ", res);
    result(null, res);
  });
};

Location.getcities = result => {
  sql.query("SELECT distinct city as name FROM location", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    //console.log("Cities: ", res);
    result(null, res);
  });
};

Location.getarea = (city,result) => {
  sql.query(`SELECT area from location where city = '${city}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err,null);
      return;
    }

    if (res.length) {
      console.log("found area: ", res);
      result(null, res);
      return;
    }
    result({ kind: "not_found" }, res);
  });
};

Location.remove = (city, result) => {
  sql.query("DELETE FROM location WHERE city = ?", city, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found User with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted location with city: ", city);
    result(null, res);
  });
};

// User.removeAll = result => {
//   sql.query("DELETE FROM location", (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }

//     console.log(`deleted ${res.affectedRows} locations`);
//     result(null, res);
//   });
// };

module.exports = Location;

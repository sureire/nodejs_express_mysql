const sql = require("./db.js");

// constructor
const Category = function(cat) {
  this.category = cat.category;
  this.subcategory = cat.subcategory;
};

Category.create = (newCategory, result) => {
  sql.query("INSERT INTO servicecategory SET ?", newCategory, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created category: ", { id: res.insertId, ...newCategory});
    result(null, { id: res.insertId, ...newCategory });
  });
};

Category.findcategory = result => {
  sql.query(`SELECT distinct category as name FROM servicecategory`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      //console.log("found category: ", res);
      result(null, res);
      return;
    }

    // not found User with the id
    result({ kind: "not_found" }, null);
  });
};

Category.findAllSubcategory = result => {
    sql.query(`SELECT distinct subcategory FROM servicecategory`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        //console.log("found subcategories: ", res);
        result(null, res);
        return;
      }
  
      // not found User with the id
      result({ kind: "not_found" }, null);
    });
  };

  Category.findSubCategoryfor = (category, result) => {
    sql.query(`SELECT subcategory FROM servicecategory WHERE category = ${category}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found subcategories: ", res);
        result(null, res);
        return;
      }
  
      // not found User with the id
      result({ kind: "not_found" }, null);
    });
  };

  Category.remove = (category, result) => {
    sql.query("DELETE FROM servicecategory WHERE category = ?", decodeURIComponent(category), (err, res) => {
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
  
      console.log("deleted category : ", category);
      result(null, res);
    });
  };

module.exports = Category;

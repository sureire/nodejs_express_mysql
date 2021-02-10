const sql = require("./db.js");

//constructor
const Services = function(services) {
    this.name = services.name;
    this.category = services.category;
    this.location = services.location;
    this.providerid = services.providerid;
};

Services.create = (newService, result) => {
    sql.query("insert into services set ?", newService, (err,res) => {
        if (err) {
            console.log("error: ", err);
            result(err,null);
            return;
        }
        console.log("Create Service: ", {id: res.insertId, ...newService});
        result(null,{id: res.insertId, ...newService});
    });
};

Services.findServicebyProvider = (providerid, result) => {
    sql.query(`select * from services where providerid = ${providerid}`, (err,res) => {
        if (err) {
            console.log("error: ", err);
            result(err,null);
            return;
        }

        if (res.length) {
            result(null,res);
            return;
        }

        result({kind: "not_found"},null);
    });
};

Services.findServicebyCategory = (category, result) => {
    sql.query(`select * from services where category = '${category}'`, (err,res) => {
        if (err) {
            console.log("error: ", err);
            result(err,null);
            return;
        }

        if (res.length) {
            result(null,res);
            return;
        }

        result({kind: "not_found"},null);
    });
};

Services.findServicebyLocation = (location, result) => {
    sql.query(`select * from services where location = '${location}'`, (err,res) => {
        if (err) {
            console.log("error: ", err);
            result(err,null);
            return;
        }

        if (res.length) {
            result(null,res);
            return;
        }

        result({kind: "not_found"},null);
    });
};

Services.findServicebyLoc_cat = (location, category,result) => {
    sql.query(`select * from services where location = '${location}' and (category = '${category}' or name = '${category}')`, (err,res) => {
        if (err) {
            console.log("error: ", err);
            result(err,null);
            return;
        }

        if (res.length) {
            result(null,res);
            return;
        }

        result({kind: "not_found"},null);
    });
};
module.exports = Services;
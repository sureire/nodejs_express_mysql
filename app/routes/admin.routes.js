module.exports = app => {
    const db = require("../models/db.js");

    app.get('/admin/servicelist', (req, res) => {
        let sql = "call adminservicelist()";
        db.query(sql,(err,data) => {
            if (err){
                console.log(err);
                res.status(500).send({
                    message: 'Error admin servicelist ..'
                });
            }
            else 
                res.status(200).send(data[0]);
        });
       
    });

};
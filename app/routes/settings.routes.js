module.exports = app => {
    const db = require("../models/db.js");

    app.get('/settings/:key', (req, res) => {
        let sql = `select * from settings where key1 = '${req.params.key}'`;
        db.query(sql, (err,data) => {
            if (err){
                console.log(err);
                res.status(500).send({
                    message: 'Error getting settings...'
                });
            }
            else 
                res.status(200).send(data[0]);
        });
       
    });

    app.get('/settings', (req, res) => {
        let sql = `select * from settings`;
        db.query(sql, (err,data) => {
            if (err){
                console.log(err);
                res.status(500).send({
                    message: 'Error getting settings...'
                });
            }
            else 
                res.status(200).send(data);
        });
       
    });

};
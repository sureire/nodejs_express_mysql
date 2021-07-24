module.exports = app => {
    const db = require("../models/db.js");

    app.post('/status', (req, res) => {
        let sql = "insert into servicestatus set ?";
        let values = 
            {
            requestid: req.body.requestid,
            status: req.body.status,
            statusdescription: req.body.statusdescription,
            engineerid:req.body.engineerid
            };
        db.query(sql, values, (err,data) => {
            if (err){
                console.log(err);
                res.status(500).send({
                    message: 'Error adding servicestatus..'
                });
            }
            else 
                res.status(200).send(data);
        });
       
    });

};
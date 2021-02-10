module.exports = app => {
    const db = require("../models/db.js");

    app.post('/wallet', (req, res) => {
        let sql = "insert into walletdetails set ?";
        let values = 
            {
            providerid: req.body.providerid,
            amount: req.body.amount,
            transtype: 'add'
            };
        db.query(sql, values, (err,data) => {
            if (err){
                console.log(err);
                res.status(500).send({
                    message: 'Error adding wallet..'
                });
            }
            else 
                res.status(200).send(data);
        });
       
    });

};
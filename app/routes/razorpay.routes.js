module.exports = app => {

    const Razorpay = require("razorpay");
    let crypto = require('crypto');
    const { v1: uuidv1 } = require('uuid');
    const ksecret = 'BxHSoL8VJz3UQudYckOIRLQt';

    app.post('/createPayment', (req, res) => {

        let instance = new Razorpay({
            key_id: "rzp_test_u2D4dnRU0hFi9j",
            key_secret: ksecret
        });
        console.log(req.body);
        let options = {
            amount: req.body.amount * 100,
            currency: "INR",
            receipt: uuidv1(),
            payment_capture: 1
        };
        instance.orders.create(options, function(err, order) {
            res.status(201).send({ order });
        });

    });

    app.post('/verifyPayment', (req, res) => {

        console.log(req.body);
        const order = req.body;

        const text = order.razorpay_order_id + "|" + order.razorpay_payment_id;
        var signature = crypto.createHmac("sha256", ksecret).update(text).digest("hex");
    
        if (signature === order.razorpay_signature) {
            res.status(201).send({ data: { message:"Successfull Payment"} });
        }else {
            res.status(400).send({ data: { message:"Signature mismatch" } });
        }
    });

};
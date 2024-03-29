const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();

app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Starting VplusU API Gateway.." });
});

//require("./app/routes/customer.routes.js")(app);
require("./app/routes/user.routes.js")(app);
require("./app/routes/location.routes.js")(app);
require("./app/routes/category.routes.js")(app);
require("./app/routes/provider.routes.js")(app);
require("./app/routes/service.routes.js")(app);
require("./app/routes/srequest.routes.js")(app);
require("./app/routes/wallet.routes.js")(app);
require("./app/routes/status.routes.js")(app);
require("./app/routes/admin.routes.js")(app);
require("./app/routes/razorpay.routes.js")(app);
require("./app/routes/settings.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

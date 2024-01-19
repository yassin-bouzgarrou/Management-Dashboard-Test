// app.js or index.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

const customerRoutes = require("./Routes/CustomerRoutes")


app.use(bodyParser.json());
app.use(cors());


//All my routes
app.use("/api", customerRoutes);



app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});



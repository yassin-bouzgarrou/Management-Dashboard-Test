const express = require("express");
const cors = require("cors");

const fs = require("fs");
const app = express();
const port = 3000;

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(cors());
let customers = loadCustomers();

app.get("/api/customers", (req, res) => {
  res.json(customers);
});

app.put("/api/customers/:id", (req, res) => {
  const customerId = parseInt(req.params.id);
  const updatedCustomer = req.body;
  //find the index of the customer with the  id
  const index = customers.findIndex((c) => c.id === customerId);
  // if found, update the customer by merging else return  Customer not found
  if (index !== -1) {
    customers[index] = { ...customers[index], ...updatedCustomer };
    saveCustomers();
    res.json(customers[index]);
  } else {
    res.status(404).json({ error: "Customer not found" });
  }
});
app.post("/api/customers", (req, res) => {
  const newCustomer = req.body;
  // genetre id unique  using Date Methode
  newCustomer.id = Date.now();
  customers.push(newCustomer);
  saveCustomers();
  res.status(201).json(newCustomer);
});

app.delete("/api/customers/:id", (req, res) => {
  const customerId = parseInt(req.params.id);
   //find the index of the customer with the  id
  const index = customers.findIndex((c) => c.id === customerId);
  // if found remove using filter else return  Customer not found"
  if (index !== -1) {
    customers = customers.filter((c) => c.id !== customerId);
    saveCustomers();
    res.json({ message: "Customer deleted successfully" });
  } else {
    res.status(404).json({ error: "Customer not found" });
  }
});

//function loadCustomers  to read from the file using  readFileSync
function loadCustomers() {
  try {
    const data = fs.readFileSync("./FakeData/Db.json");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error loading customer data:", error.message);
    return [];
  }
}

//  'writeFileSync' method to write data to can update or add customer
function saveCustomers() {
  fs.writeFileSync("./FakeData/Db.json", JSON.stringify(customers, null, 2));
}

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});

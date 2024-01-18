const express = require("express");
const cors = require('cors');

const fs = require("fs");
const app = express();
const port = 3000;


const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(cors())
let customers = loadCustomers();

app.get("/api/customers", (req, res) => {
  res.json(customers);
});

app.put("/api/customers/:id", (req, res) => {
  const customerId = parseInt(req.params.id);
  const updatedCustomer = req.body;
  const index = customers.findIndex((c) => c.id === customerId);
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
  newCustomer.id =Date.now()
  customers.push(newCustomer);
  saveCustomers();
  res.status(201).json(newCustomer);
});

app.delete("/api/customers/:id", (req, res) => {
  const customerId = parseInt(req.params.id);
  const index = customers.findIndex((c) => c.id === customerId);

  if (index !== -1) {
  
    customers = customers.filter((c) => c.id !== customerId);
    saveCustomers();
    res.json({ message: "Customer deleted successfully" });
  } else {
  
    res.status(404).json({ error: "Customer not found" });
  }
});

function loadCustomers() {
  try {
    const data = fs.readFileSync("./FakeData/Db.json");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error loading customer data:", error.message);
    return [];
  }
}

function saveCustomers() {
  fs.writeFileSync("./FakeData/Db.json", JSON.stringify(customers, null, 2));
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

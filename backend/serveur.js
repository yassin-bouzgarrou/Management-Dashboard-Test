const express = require("express");
const app = express();
const port = 3000;
const { loadCustomers, saveCustomers } = require("./Helperfunction/helper");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
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

app.delete("/api/customers/:id", (req, res) => {
  const customerId = parseInt(req.params.id);
  customers = customers.filter((c) => c.id !== customerId);
  saveCustomers();
  res.json({ message: "Customer deleted successfully" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


const express = require("express");
const router = express.Router();
const fs = require("fs");


// Load customer data from file
function loadCustomers() {
  try {
    const data = fs.readFileSync("./FakeData/Db.json");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error loading customer data:", error.message);
    return [];
  }
}

// Write data to file to update or add customer
function saveCustomers(customers) {
  fs.writeFileSync("./FakeData/Db.json", JSON.stringify(customers, null, 2));
}

// Handle basic user login
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const users = [
    { id: 1, email: "test@gmail.com1", password: "password1" },
    { id: 2, email: "test@gmail.com", password: "password2" },
    { id: 2, email: "yassin@gmail.com", password: "yassin" },
  ];

  const user = users.find((u) => u.email === email && u.password === password);

  if (user) {
    res.json({ message: "Login successful", user });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

router.get("/customers", (req, res) => {
  const customers = loadCustomers();
  res.json(customers);
});

router.put("/customers/:id", (req, res) => {
  const customerId = parseInt(req.params.id);
  const updatedCustomer = req.body;

  // Find the index of the customer with the id
  const customers = loadCustomers();
  const index = customers.findIndex((c) => c.id === customerId);

  // If found, update the customer by merging; else, return Customer not found
  if (index !== -1) {
    customers[index] = { ...customers[index], ...updatedCustomer };
    saveCustomers(customers);
    res.json(customers[index]);
  } else {
    res.status(404).json({ error: "Customer not found" });
  }
});

router.post("/customers", (req, res) => {
  const newCustomer = req.body;
  const customers = loadCustomers();

  // Generate a unique id using Date method
  newCustomer.id = Date.now();
  customers.push(newCustomer);
  saveCustomers(customers);

  res.status(201).json(newCustomer);
});

router.delete("/customers/:id", (req, res) => {
    const customerId = parseInt(req.params.id);
    let customers = loadCustomers(); // Change 'const' to 'let' here
  
    // Find the index of the customer with the id
    const index = customers.findIndex((c) => c.id === customerId);
  
    // If found, remove using filter; else, return Customer not found
    if (index !== -1) {
      customers = customers.filter((c) => c.id !== customerId);
      saveCustomers(customers);
      res.json({ message: "Customer deleted successfully" });
    } else {
      res.status(404).json({ error: "Customer not found" });
    }
  });

module.exports = router;

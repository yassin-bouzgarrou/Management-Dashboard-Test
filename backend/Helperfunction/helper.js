const fs = require('fs');

function loadCustomers() {
    try {
      const data = fs.readFileSync('./FakeData/Db.json');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error loading customer data:', error.message);
      return [];
    }
  }

  
function saveCustomers() {
    fs.writeFileSync('./FakeData/Db.json', JSON.stringify(customers, null, 2));
  }


  
module.exports = {
    loadCustomers,
    saveCustomers,
  };
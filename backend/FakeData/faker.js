
const faker = require('faker');

const generateFakeData = () => {
  const fakeData = {
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    number: faker.phone.phoneNumber(),
    addres: faker.address.streetAddress(),
    city: faker.address.city(),
    dateOfBirdhday: faker.date.past().toISOString().split('T')[0], // Format as YYYY-MM-DD
  };

  return fakeData;
};


const sequelize = require('../config/connection');
const { Employee, Orders } = require('../models');

const employeeData = require('./employeeData.json');
const orderData = require('./orderData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const employees = await User.bulkCreate(employeeData, {
    individualHooks: true,
    returning: true,
  });

  for (const order of orderData) {
    await Order.create({
      ...order,
      name: employees[Math.floor(Math.random() * employees.length)].id,
    });
  }

  process.exit(0);
};
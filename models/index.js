require('dotenv').config();  // Load environment variables from .env

const { Sequelize, DataTypes } = require('sequelize');

// Initialize Sequelize instance with environment variables
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
});

// Import models
const Customer = require('./customer')(sequelize, DataTypes);
const Order = require('./order')(sequelize, DataTypes);
const Employee = require('./employee')(sequelize, DataTypes);
const Role = require('./role')(sequelize, DataTypes);

// Define associations
Order.belongsTo(Customer);
Customer.hasMany(Order);

Employee.belongsTo(Role, { foreignKey: 'roleId' });
Role.hasMany(Employee, { foreignKey: 'roleId' });

Employee.belongsTo(Employee, { as: 'Manager', foreignKey: 'managerId' });

// Export the models and Sequelize instance
module.exports = { sequelize, Order, Employee, Customer, Role };
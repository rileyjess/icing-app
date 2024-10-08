const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('database_name', 'username', 'password', {
    host: 'localhost',
    dialect: 'postgres',
});

const Order = require('./order'); 
const Employee = require('./employee');

Order.belongsTo(Customer); 
Customer.hasMany(Order);

Employee.belongsTo(Role, { foreignKey: 'roleId' });
Role.hasMany(Employee, { foreignKey: 'roleId' });

Employee.belongsTo(Employee, { as: 'Manager', foreignKey: 'managerId' });

module.exports = { sequelize, Order, Employee };
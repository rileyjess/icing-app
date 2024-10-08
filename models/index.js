const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('database_name', 'username', 'password', {
    host: 'localhost',
    dialect: 'postgres',
});

const Customer = require('./customer')(sequelize, DataTypes);
const Order = require('./order')(sequelize, DataTypes); 
const Employee = require('./employee')(sequelize, DataTypes);
const Role = require('./role')(sequelize, DataTypes);

Order.belongsTo(Customer); 
Customer.hasMany(Order);

Employee.belongsTo(Role, { foreignKey: 'roleId' });
Role.hasMany(Employee, { foreignKey: 'roleId' });

Employee.belongsTo(Employee, { as: 'Manager', foreignKey: 'managerId' });

module.exports = { sequelize, Order, Employee, Customer, Role };
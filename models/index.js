const Employee = require('./employee');
const Orders = require('./orders');

Employee.hasMany(Orders, {
  foreignKey: 'name',
  onDelete: 'CASCADE'
});

Orders.belongsTo(Employee, {
  foreignKey: 'name'
});

module.exports = { Employee, Orders };
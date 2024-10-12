const Employee = require('./employee');
const Order = require('./order');


Employee.hasMany(Order, {
  foreignKey: 'employee_id',
  onDelete: 'CASCADE'
});


Order.belongsTo(Employee, {
  foreignKey: 'employee_id'
});

module.exports = { Employee, Order };

// Fixed to match Sequelize and updated the foreign key
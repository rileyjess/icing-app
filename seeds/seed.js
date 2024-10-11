const sequelize = require('./config/connection');
const { Employee, Orders } = require('../models');

const employeeData = require('./employeeData.json');
const orderData = require('./orderData.json');

const seedDatabase = async () => {
    try {
        await sequelize.sync({ force: true }); 
        console.log('Database synced successfully.');

        const employees = await Employee.bulkCreate(employeeData);
        console.log('Employee data seeded successfully.');

        const ordersWithEmployeeId = orderData.map((order, index) => {
            return {
                ...order,
                employeeId: employees[index % employees.length].id 
            };
        });

        await Orders.bulkCreate(ordersWithEmployeeId);
        console.log('Order data seeded successfully.');

    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        process.exit(0);
    }
};

seedDatabase();
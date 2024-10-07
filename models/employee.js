import { createOrder, displayOrders } from './order.js';
import { assignEmployee, displayAssignedEmployees } from './employeeAssigned.js';

function init() {
    console.log("Welcome to the Employee Management System!");

    assignEmployee("John Smith", "Order #1");
    assignEmployee("Jane Doe", "Order #2");
    displayAssignedEmployees();

    createOrder("Order #1", 100);
    createOrder("Order #2", 200);
    displayOrders();
}

init();
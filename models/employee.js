import { createOrder, displayOrders } from './order.js';
import { assignEmployee, displayAssignedEmployees } from './employee.js';

function init() {
    console.log("Welcome to the Employee Management System!");

    assignEmployee("John Smith", "Nathan Drake");
    assignEmployee("Jane Doe", "Peter Parker");
    displayAssignedEmployees();

    createOrder("Nathan Drake", 100);
    createOrder("Peter Parker", 200);
    displayOrders();
}

init();
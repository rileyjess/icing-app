const orders = [];

// Function to create a new order
function createOrder(orderName) {
    const order = {
        name: orderName,
        date: new Date().toLocaleString()
    };
    orders.push(order);
    console.log(`Order created: ${orderName}`);
}

// Function to display all current orders
function displayOrders() {
    console.log("Current Orders:");
    orders.forEach(order => {
        console.log(`- ${order.name}: (Date: ${order.date})`);
    });
}

// Export the functions
module.exports = { createOrder, displayOrders };
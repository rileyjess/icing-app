const orders = [];

export function createOrder(orderName) {
    const order = {
        name: orderName,
        date: new Date().toLocaleString()
    };
    orders.push(order);
    console.log(`Order created: ${orderName}`);
}

export function displayOrders() {
    console.log("Current Orders:");
    orders.forEach(order => {
        console.log(`- ${order.name}: (Date: ${order.date})`);
    });
}
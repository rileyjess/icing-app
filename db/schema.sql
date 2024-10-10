-- Create the employee table
CREATE TABLE employee (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER NOT NULL,
    manager_id INTEGER,
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);

-- Create the orders table
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    order_name VARCHAR(50) NOT NULL,
    employee_id INTEGER,
    FOREIGN KEY (employee_id) REFERENCES employee(id)
);
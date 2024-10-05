const express = require('express');
const router = express.Router();
const Joi = require('joi');

// Import required models 

const { Order } = require('../../models');

// Middleware for validation

const validateNewOrder = (req, res, next) => {
  const schema = Joi.object({
    customerName: Joi.string().min(3).required(),
    orderDetails: Joi.string().required(),
    status: Joi.string().valid('new', 'in-progress', 'completed').required(),
    createdAt: Joi.date().default(() => new Date(), 'time of order creation'),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};

// GET route for retrieving all orders

router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.findAll();  // Fetch all orders from the database
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve orders' });
  }
});

// POST route for adding a new order

router.post('/orders', validateNewOrder, async (req, res) => {
  try {
    const newOrder = await Order.create(req.body);  // Add new order to the database
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create new order' });
  }
});

// PUT route for updating an order status

router.put('/orders/:id', async (req, res) => {
  try {
    const updatedOrder = await Order.update(
      { status: req.body.status },
      { where: { id: req.params.id } }
    );
    
    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Order updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update order' });
  }
});

// DELETE route for deleting an order

router.delete('/orders/:id', async (req, res) => {
  try {
    const deleted = await Order.destroy({ where: { id: req.params.id } });
    
    if (!deleted) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete order' });
  }
});

module.exports = router;

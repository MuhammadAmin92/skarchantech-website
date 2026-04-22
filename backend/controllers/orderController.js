const Order = require('../models/Order');
const User = require('../models/User');
const { sendOrderNotification, sendOrderConfirmation } = require('../config/email');

// Create new order
const createOrder = async (req, res) => {
  try {
    const { products, totalPrice, shippingAddress, paymentMethod } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({ message: 'No products selected!' });
    }

    const order = await Order.create({
      user: req.user._id,
      products,
      totalPrice,
      shippingAddress,
      paymentMethod: paymentMethod || 'Cash on Delivery'
    });

    // Email notifications
    const user = await User.findById(req.user._id);
    sendOrderNotification(order);
    if (user?.email) {
      sendOrderConfirmation(order, user.email);
    }

    res.status(201).json(order);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get my orders
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('products.product', 'name image price');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all orders (Admin)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email phone')
      .populate('products.product', 'name image price');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update order status (Admin)
const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found!' });
    }
    order.status = req.body.status || order.status;
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus
};
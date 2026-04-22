const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// New order email to admin
const sendOrderNotification = async (order) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `🛒 New Order Received! #${order._id.toString().slice(-8).toUpperCase()}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #111111; padding: 20px; text-align: center;">
            <h1 style="color: #0066ff; margin: 0;">⚡ SKARCHAN</h1>
            <p style="color: #888; margin: 5px 0;">New Order Notification</p>
          </div>

          <div style="padding: 25px; background: #f9f9f9;">
            <h2 style="color: #111;">New Order Received! 🎉</h2>

            <div style="background: white; padding: 20px; border-radius: 8px; margin: 15px 0; border: 1px solid #eee;">
              <h3 style="color: #0066ff; margin-top: 0;">Order Details</h3>
              <p><strong>Order ID:</strong> #${order._id.toString().slice(-8).toUpperCase()}</p>
              <p><strong>Total Amount:</strong> Rs. ${order.totalPrice.toLocaleString()}</p>
              <p><strong>Payment:</strong> Cash on Delivery</p>
              <p><strong>Date:</strong> ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            </div>

            <div style="background: white; padding: 20px; border-radius: 8px; margin: 15px 0; border: 1px solid #eee;">
              <h3 style="color: #0066ff; margin-top: 0;">Customer Details</h3>
              <p><strong>Name:</strong> ${order.shippingAddress?.name}</p>
              <p><strong>Phone:</strong> ${order.shippingAddress?.phone}</p>
              <p><strong>Address:</strong> ${order.shippingAddress?.address}</p>
              <p><strong>City:</strong> ${order.shippingAddress?.city}</p>
            </div>

            <div style="background: white; padding: 20px; border-radius: 8px; margin: 15px 0; border: 1px solid #eee;">
              <h3 style="color: #0066ff; margin-top: 0;">Ordered Products</h3>
              ${order.products.map(item => `
                <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #f0f0f0;">
                  <span>Product ID: ${item.product}</span>
                  <span>Qty: ${item.quantity} × Rs. ${item.price.toLocaleString()}</span>
                </div>
              `).join('')}
            </div>

            <div style="background: #0066ff; padding: 15px; border-radius: 8px; text-align: center;">
              <p style="color: white; margin: 0; font-size: 18px;">
                <strong>Total: Rs. ${order.totalPrice.toLocaleString()}</strong>
              </p>
            </div>
          </div>

          <div style="background: #111111; padding: 15px; text-align: center;">
            <p style="color: #888; margin: 0; font-size: 12px;">
              Skarchan Mobile & Electronics — Admin Notification
            </p>
          </div>
        </div>
      `
    });
    console.log('✅ Order notification email sent!');
  } catch (error) {
    console.log('❌ Email error:', error.message);
  }
};

// Order confirmation email to customer
const sendOrderConfirmation = async (order, customerEmail) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: customerEmail,
      subject: `✅ Order Confirmed! #${order._id.toString().slice(-8).toUpperCase()}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #111111; padding: 20px; text-align: center;">
            <h1 style="color: #0066ff; margin: 0;">⚡ SKARCHAN</h1>
            <p style="color: #888; margin: 5px 0;">Mobile & Electronics</p>
          </div>

          <div style="padding: 25px; background: #f9f9f9;">
            <h2 style="color: #111;">Your Order is Confirmed! ✅</h2>
            <p style="color: #555;">Thank you for shopping at Skarchan Mobile & Electronics!</p>

            <div style="background: white; padding: 20px; border-radius: 8px; margin: 15px 0; border: 1px solid #eee;">
              <h3 style="color: #0066ff; margin-top: 0;">Order Summary</h3>
              <p><strong>Order ID:</strong> #${order._id.toString().slice(-8).toUpperCase()}</p>
              <p><strong>Total Amount:</strong> Rs. ${order.totalPrice.toLocaleString()}</p>
              <p><strong>Payment:</strong> Cash on Delivery</p>
            </div>

            <div style="background: white; padding: 20px; border-radius: 8px; margin: 15px 0; border: 1px solid #eee;">
              <h3 style="color: #0066ff; margin-top: 0;">Delivery Details</h3>
              <p><strong>Name:</strong> ${order.shippingAddress?.name}</p>
              <p><strong>Address:</strong> ${order.shippingAddress?.address}</p>
              <p><strong>City:</strong> ${order.shippingAddress?.city}</p>
              <p><strong>Phone:</strong> ${order.shippingAddress?.phone}</p>
            </div>

            <div style="background: #e8fff4; padding: 15px; border-radius: 8px; border: 1px solid #00aa5533;">
              <p style="color: #00aa55; margin: 0;">
                🚚 We will contact you soon for delivery!
              </p>
            </div>
          </div>

          <div style="background: #111111; padding: 20px; text-align: center;">
            <p style="color: #888; margin: 0 0 5px; font-size: 12px;">Need help? Contact us:</p>
            <p style="color: #0066ff; margin: 0; font-size: 14px;">+92 300 0000000</p>
          </div>
        </div>
      `
    });
    console.log('✅ Order confirmation email sent to customer!');
  } catch (error) {
    console.log('❌ Customer email error:', error.message);
  }
};

module.exports = { sendOrderNotification, sendOrderConfirmation };
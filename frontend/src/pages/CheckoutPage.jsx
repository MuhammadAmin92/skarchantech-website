import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const CheckoutPage = () => {
  const { cartItems, totalPrice, clearCart } = useCart();
  const { userInfo } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState(userInfo?.name || '');
  const [phone, setPhone] = useState(userInfo?.phone || '');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const placeOrderHandler = async () => {
    if (!name || !phone || !address || !city) {
      setError('Please fill in all fields!');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const orderData = {
        products: cartItems.map((item) => ({
          product: item._id,
          quantity: item.quantity,
          price: item.price
        })),
        totalPrice,
        shippingAddress: { name, phone, address, city },
        paymentMethod: 'Cash on Delivery'
      };
      await API.post('/orders', orderData);
      clearCart();
      navigate('/order-success');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to place order!');
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.pageHeader}>
        <div style={styles.pageHeaderInner}>
          <h1 style={styles.pageTitle}>Checkout</h1>
          <p style={styles.pageSub}>Complete your order</p>
        </div>
      </div>

      <div style={styles.container}>
        <div style={styles.layout}>

          {/* Shipping Form */}
          <div style={styles.formSection}>

            {/* Steps */}
            <div style={styles.steps}>
              <div style={styles.step}>
                <div style={styles.stepCircleActive}>1</div>
                <span style={styles.stepLabelActive}>Shipping</span>
              </div>
              <div style={styles.stepLine} />
              <div style={styles.step}>
                <div style={styles.stepCircle}>2</div>
                <span style={styles.stepLabel}>Payment</span>
              </div>
              <div style={styles.stepLine} />
              <div style={styles.step}>
                <div style={styles.stepCircle}>3</div>
                <span style={styles.stepLabel}>Confirm</span>
              </div>
            </div>

            <h2 style={styles.sectionTitle}>📍 Shipping Details</h2>

            {error && <div style={styles.error}>⚠️ {error}</div>}

            <div style={styles.form}>
              <div style={styles.row}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Full Name</label>
                  <input
                    type='text'
                    placeholder='Enter your full name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={styles.input}
                  />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Phone Number</label>
                  <input
                    type='text'
                    placeholder='Enter your phone number'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={styles.input}
                  />
                </div>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Street Address</label>
                <input
                  type='text'
                  placeholder='Enter your street address'
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  style={styles.input}
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>City</label>
                <input
                  type='text'
                  placeholder='Enter your city'
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  style={styles.input}
                />
              </div>
            </div>

            {/* Payment Method */}
            <h2 style={{ ...styles.sectionTitle, marginTop: '30px' }}>💰 Payment Method</h2>
            <div style={styles.paymentOption}>
              <div style={styles.paymentLeft}>
                <span style={styles.paymentIcon}>💵</span>
                <div>
                  <p style={styles.paymentName}>Cash on Delivery</p>
                  <p style={styles.paymentDesc}>Pay when your order arrives</p>
                </div>
              </div>
              <div style={styles.selectedDot} />
            </div>
          </div>

          {/* Order Summary */}
          <div style={styles.summary}>
            <h2 style={styles.summaryTitle}>Order Summary</h2>

            <div style={styles.orderItems}>
              {cartItems.map((item) => (
                <div key={item._id} style={styles.orderItem}>
                  <img
                    src={item.image || 'https://via.placeholder.com/60'}
                    alt={item.name}
                    style={styles.itemImage}
                  />
                  <div style={styles.itemInfo}>
                    <p style={styles.itemName}>{item.name}</p>
                    <p style={styles.itemQty}>Qty: {item.quantity}</p>
                  </div>
                  <p style={styles.itemPrice}>
                    Rs. {(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            <div style={styles.divider} />

            <div style={styles.summaryRows}>
              <div style={styles.summaryRow}>
                <span style={styles.summaryLabel}>Subtotal</span>
                <span style={styles.summaryValue}>Rs. {totalPrice.toLocaleString()}</span>
              </div>
              <div style={styles.summaryRow}>
                <span style={styles.summaryLabel}>Delivery</span>
                <span style={styles.freeText}>FREE</span>
              </div>
              <div style={styles.summaryRow}>
                <span style={styles.summaryLabel}>Payment</span>
                <span style={styles.summaryValue}>Cash on Delivery</span>
              </div>
            </div>

            <div style={styles.divider} />

            <div style={styles.totalRow}>
              <span style={styles.totalLabel}>Total</span>
              <span style={styles.totalPrice}>Rs. {totalPrice.toLocaleString()}</span>
            </div>

            <button
              onClick={placeOrderHandler}
              disabled={loading}
              style={{ ...styles.orderBtn, opacity: loading ? 0.7 : 1 }}
            >
              {loading ? 'Placing Order...' : '✅ Place Order'}
            </button>

            <div style={styles.secureNote}>
              🔒 Your information is secure and encrypted
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: { backgroundColor: '#f5f5f5', minHeight: '100vh' },
  pageHeader: { backgroundColor: '#111111', padding: '35px 30px' },
  pageHeaderInner: { maxWidth: '1200px', margin: '0 auto' },
  pageTitle: { fontSize: '30px', fontWeight: '800', color: '#ffffff', marginBottom: '5px' },
  pageSub: { color: '#888', fontSize: '14px' },
  container: { maxWidth: '1200px', margin: '0 auto', padding: '30px' },
  layout: {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '25px'
},
  steps: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '30px'
  },
  step: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' },
  stepCircleActive: {
    width: '32px', height: '32px',
    borderRadius: '50%',
    backgroundColor: '#0066ff',
    color: 'white',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '14px', fontWeight: '700'
  },
  stepCircle: {
    width: '32px', height: '32px',
    borderRadius: '50%',
    backgroundColor: '#f0f0f0',
    color: '#888',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '14px', fontWeight: '700'
  },
  stepLabelActive: { fontSize: '11px', color: '#0066ff', fontWeight: '700' },
  stepLabel: { fontSize: '11px', color: '#888' },
  stepLine: { flex: 1, height: '2px', backgroundColor: '#f0f0f0', margin: '0 10px', marginBottom: '18px' },
  sectionTitle: { fontSize: '17px', fontWeight: '700', color: '#111', marginBottom: '20px' },
  error: {
    backgroundColor: '#fff0f0',
    color: '#ff3333',
    padding: '12px 15px',
    borderRadius: '8px',
    marginBottom: '20px',
    fontSize: '14px'
  },
  form: { display: 'flex', flexDirection: 'column', gap: '18px' },
  row: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '7px' },
  label: { fontSize: '13px', fontWeight: '700', color: '#444' },
  input: {
    padding: '13px 16px',
    borderRadius: '8px',
    border: '1px solid #e0e0e0',
    fontSize: '14px',
    outline: 'none',
    backgroundColor: '#f8f8f8',
    color: '#111'
  },
  paymentOption: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '18px',
    backgroundColor: '#f0f7ff',
    borderRadius: '10px',
    border: '2px solid #0066ff'
  },
  paymentLeft: { display: 'flex', alignItems: 'center', gap: '15px' },
  paymentIcon: { fontSize: '30px' },
  paymentName: { fontWeight: '700', color: '#111', fontSize: '15px' },
  paymentDesc: { color: '#888', fontSize: '12px' },
  selectedDot: {
    width: '20px', height: '20px',
    borderRadius: '50%',
    backgroundColor: '#0066ff',
    border: '3px solid white',
    boxShadow: '0 0 0 2px #0066ff'
  },
  summary: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '25px',
    border: '1px solid #eeeeee',
    height: 'fit-content'
  },
  summaryTitle: { fontSize: '18px', fontWeight: '800', color: '#111', marginBottom: '20px' },
  orderItems: { display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' },
  orderItem: { display: 'flex', alignItems: 'center', gap: '12px' },
  itemImage: { width: '55px', height: '55px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #eee' },
  itemInfo: { flex: 1 },
  itemName: { fontSize: '13px', fontWeight: '700', color: '#111', marginBottom: '3px' },
  itemQty: { fontSize: '12px', color: '#888' },
  itemPrice: { fontSize: '13px', fontWeight: '700', color: '#0066ff' },
  divider: { borderTop: '1px solid #f0f0f0', margin: '15px 0' },
  summaryRows: { display: 'flex', flexDirection: 'column', gap: '12px' },
  summaryRow: { display: 'flex', justifyContent: 'space-between' },
  summaryLabel: { fontSize: '13px', color: '#666' },
  summaryValue: { fontSize: '13px', fontWeight: '600', color: '#111' },
  freeText: { fontSize: '13px', fontWeight: '700', color: '#00aa55' },
  totalRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  totalLabel: { fontSize: '16px', fontWeight: '700', color: '#111' },
  totalPrice: { fontSize: '22px', fontWeight: '800', color: '#0066ff' },
  orderBtn: {
    width: '100%',
    backgroundColor: '#0066ff',
    color: 'white',
    border: 'none',
    padding: '15px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '15px',
    fontWeight: '700',
    marginBottom: '15px'
  },
  secureNote: {
    textAlign: 'center',
    fontSize: '12px',
    color: '#888',
    backgroundColor: '#f8f8f8',
    padding: '10px',
    borderRadius: '8px'
  }
};

export default CheckoutPage;
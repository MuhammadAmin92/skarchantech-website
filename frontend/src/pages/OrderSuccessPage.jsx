import { Link } from 'react-router-dom';

const OrderSuccessPage = () => {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <span style={styles.icon}>🎉</span>
        <h1 style={styles.title}>Order Placed!</h1>
        <p style={styles.text}>
          Thank you! Your order was successful.
        </p>
        <p style={styles.subText}>
          We will contact you soon to confirm the details and arrange delivery.
        </p>

        <div style={styles.infoBox}>
          <p>💰 Payment: Cash on Delivery</p>
          <p>🚚 Delivery: Skarchan Area</p>
          <p>📞 Contact: +92 300 0000000</p>
        </div>

        <div style={styles.buttons}>
          <Link to='/products' style={styles.shopBtn}>
            🛍️ Continue Shopping
          </Link>
          <Link to='/' style={styles.homeBtn}>
            🏠 Go to Home Page
          </Link>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '70vh',
    padding: '20px'
  },
  card: {
    backgroundColor: 'white',
    padding: '50px 40px',
    borderRadius: '15px',
    boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
    textAlign: 'center',
    maxWidth: '500px',
    width: '100%'
  },
  icon: {
    fontSize: '70px',
    display: 'block',
    marginBottom: '20px'
  },
  title: {
    fontSize: '28px',
    color: '#28a745',
    marginBottom: '15px'
  },
  text: {
    fontSize: '16px',
    color: '#555',
    marginBottom: '10px'
  },
  subText: {
    fontSize: '14px',
    color: '#888',
    marginBottom: '25px'
  },
  infoBox: {
    backgroundColor: '#f8f9fa',
    padding: '20px',
    borderRadius: '10px',
    marginBottom: '25px',
    fontSize: '14px',
    color: '#555',
    lineHeight: '2',
    textAlign: 'left'
  },
  buttons: {
    display: 'flex',
    gap: '15px',
    justifyContent: 'center'
  },
  shopBtn: {
    backgroundColor: '#e94560',
    color: 'white',
    padding: '12px 20px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: 'bold'
  },
  homeBtn: {
    backgroundColor: '#1a1a2e',
    color: 'white',
    padding: '12px 20px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: 'bold'
  }
};

export default OrderSuccessPage;
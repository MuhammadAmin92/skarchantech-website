import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const { userInfo } = useAuth();
  const navigate = useNavigate();

  const checkoutHandler = () => {
    if (!userInfo) {
      navigate('/login');
    } else {
      navigate('/checkout');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div style={styles.emptyPage}>
        <div style={styles.emptyBox}>
          <p style={styles.emptyIcon}>🛒</p>
          <h2 style={styles.emptyTitle}>Your Cart is Empty</h2>
          <p style={styles.emptyText}>Looks like you haven't added anything yet.</p>
          <Link to='/products' style={styles.shopBtn}>Browse Products →</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.pageHeader}>
        <div style={styles.pageHeaderInner}>
          <h1 style={styles.pageTitle}>Shopping Cart</h1>
          <p style={styles.pageSub}>{cartItems.length} item(s) in your cart</p>
        </div>
      </div>

      <div style={styles.container}>
        <div style={styles.layout}>

          {/* Cart Items */}
          <div style={styles.cartSection}>
            <div style={styles.cartHeader}>
              <span style={styles.cartHeaderText}>Product</span>
              <span style={styles.cartHeaderText}>Price</span>
              <span style={styles.cartHeaderText}>Quantity</span>
              <span style={styles.cartHeaderText}>Total</span>
              <span></span>
            </div>

            {cartItems.map((item) => (
              <div key={item._id} style={styles.cartItem}>
                <div style={styles.productCell}>
                  <img
                    src={item.image || 'https://via.placeholder.com/80'}
                    alt={item.name}
                    style={styles.itemImage}
                  />
                  <div>
                    <p style={styles.itemName}>{item.name}</p>
                    <p style={styles.itemCategory}>{item.category}</p>
                    <p style={styles.itemBrand}>{item.brand}</p>
                  </div>
                </div>

                <p style={styles.itemPrice}>Rs. {item.price.toLocaleString()}</p>

                <div style={styles.qtySection}>
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                    style={styles.qtyBtn}
                  >−</button>
                  <span style={styles.qtyNum}>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                    style={styles.qtyBtn}
                  >+</button>
                </div>

                <p style={styles.itemTotal}>
                  Rs. {(item.price * item.quantity).toLocaleString()}
                </p>

                <button
                  onClick={() => removeFromCart(item._id)}
                  style={styles.removeBtn}
                >✕</button>
              </div>
            ))}

            <div style={styles.cartFooter}>
              <button onClick={clearCart} style={styles.clearBtn}>
                🗑️ Clear Cart
              </button>
              <Link to='/products' style={styles.continueBtn}>
                ← Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div style={styles.summary}>
            <h2 style={styles.summaryTitle}>Order Summary</h2>

            <div style={styles.summaryRows}>
              <div style={styles.summaryRow}>
                <span style={styles.summaryLabel}>Subtotal ({cartItems.length} items)</span>
                <span style={styles.summaryValue}>Rs. {totalPrice.toLocaleString()}</span>
              </div>
              <div style={styles.summaryRow}>
                <span style={styles.summaryLabel}>Delivery Charges</span>
                <span style={styles.freeText}>FREE</span>
              </div>
              <div style={styles.summaryRow}>
                <span style={styles.summaryLabel}>Payment Method</span>
                <span style={styles.summaryValue}>Cash on Delivery</span>
              </div>
            </div>

            <div style={styles.divider} />

            <div style={styles.totalRow}>
              <span style={styles.totalLabel}>Total Amount</span>
              <span style={styles.totalPrice}>Rs. {totalPrice.toLocaleString()}</span>
            </div>

            <button onClick={checkoutHandler} style={styles.checkoutBtn}>
              Proceed to Checkout →
            </button>

            <div style={styles.secureBox}>
              <span>🔒 Secure Checkout</span>
              <span>💰 Cash on Delivery</span>
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
  llayout: {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '25px'
},
  cartHeader: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr 1fr 40px',
    padding: '15px 20px',
    backgroundColor: '#f8f8f8',
    borderBottom: '1px solid #eee',
    gap: '10px'
  },
  cartHeaderText: { fontSize: '12px', fontWeight: '700', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' },
  cartItem: {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: '15px',
  padding: '20px',
  borderBottom: '1px solid #f0f0f0'
},
  productCell: { display: 'flex', alignItems: 'center', gap: '15px' },
  itemImage: { width: '70px', height: '70px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #eee' },
  itemName: { fontSize: '14px', fontWeight: '700', color: '#111', marginBottom: '3px' },
  itemCategory: { fontSize: '11px', color: '#0066ff', fontWeight: '600' },
  itemBrand: { fontSize: '11px', color: '#888' },
  itemPrice: { fontSize: '14px', color: '#111', fontWeight: '600' },
  qtySection: { display: 'flex', alignItems: 'center', gap: '8px' },
  qtyBtn: {
    width: '30px',
    height: '30px',
    borderRadius: '6px',
    border: '1px solid #ddd',
    backgroundColor: '#f5f5f5',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  qtyNum: { fontSize: '15px', fontWeight: '700', minWidth: '25px', textAlign: 'center', color: '#111' },
  itemTotal: { fontSize: '15px', fontWeight: '800', color: '#0066ff' },
  removeBtn: {
    backgroundColor: '#fff0f0',
    color: '#ff3333',
    border: 'none',
    width: '30px',
    height: '30px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '700'
  },
  cartFooter: {
    padding: '15px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  clearBtn: {
    backgroundColor: 'transparent',
    border: '1px solid #ff3333',
    color: '#ff3333',
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '600'
  },
  continueBtn: {
    color: '#0066ff',
    fontSize: '13px',
    fontWeight: '600',
    textDecoration: 'none'
  },
  summary: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '25px',
    border: '1px solid #eeeeee',
    height: 'fit-content'
  },
  summaryTitle: { fontSize: '18px', fontWeight: '800', color: '#111', marginBottom: '20px' },
  summaryRows: { display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' },
  summaryRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  summaryLabel: { fontSize: '13px', color: '#666' },
  summaryValue: { fontSize: '13px', fontWeight: '600', color: '#111' },
  freeText: { fontSize: '13px', fontWeight: '700', color: '#00aa55' },
  divider: { borderTop: '2px solid #f0f0f0', marginBottom: '20px' },
  totalRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  totalLabel: { fontSize: '16px', fontWeight: '700', color: '#111' },
  totalPrice: { fontSize: '22px', fontWeight: '800', color: '#0066ff' },
  checkoutBtn: {
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
  secureBox: {
    display: 'flex',
    justifyContent: 'space-around',
    backgroundColor: '#f8f8f8',
    padding: '10px',
    borderRadius: '8px',
    fontSize: '12px',
    color: '#888'
  },
  emptyPage: { minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  emptyBox: { textAlign: 'center', padding: '50px' },
  emptyIcon: { fontSize: '70px', marginBottom: '20px' },
  emptyTitle: { fontSize: '24px', fontWeight: '800', color: '#111', marginBottom: '10px' },
  emptyText: { color: '#888', fontSize: '15px', marginBottom: '25px' },
  shopBtn: {
    backgroundColor: '#0066ff',
    color: 'white',
    padding: '13px 30px',
    borderRadius: '8px',
    fontWeight: '700',
    fontSize: '15px'
  }
};

export default CartPage;
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { cartItems } = useCart();
  const { userInfo, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const logoutHandler = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
  };

  return (
    <nav style={styles.nav}>
      {/* Top Bar */}
      <div
        style={{
          ...styles.topBar,
          justifyContent: 'center'
        }}
        className='navbar-top-bar'
      >
        <span
          style={{
            ...styles.topBarText,
            color: '#fff'
          }}
        >
          Shoping All over Pakistan
        </span>
      </div>

      {/* Main Nav */}
      <div style={styles.navInner} className='navbar-inner'>
        {/* Logo */}
        <Link to='/' style={styles.logo}>
          <div style={styles.logoBox}>
            <span style={styles.logoIcon}>⚡</span>
          </div>
          <div>
            <div style={styles.logoText} className='navbar-logo-text'>SKARCHAN</div>
            <div style={styles.logoSub}>MOBILE & ELECTRONICS</div>
          </div>
        </Link>

        {/* Desktop Links */}
        <div style={styles.links} className='navbar-links desktop-links'>
          <Link to='/' style={styles.link}>Home</Link>
          <Link to='/products' style={styles.link}>Products</Link>
          <Link to='/contact' style={styles.link}>Contact</Link>

          <Link to='/cart' style={styles.cartBtn}>
            🛒 Cart
            {cartItems.length > 0 && (
              <span style={styles.badge}>{cartItems.length}</span>
            )}
          </Link>

          {userInfo ? (
            <div style={styles.userMenu}>
              {userInfo.isAdmin && (
                <Link to='/admin' style={styles.adminBtn}>⚙️ Admin</Link>
              )}
              <span style={styles.userName}>👤 {userInfo.name.split(' ')[0]}</span>
              <button onClick={logoutHandler} style={styles.logoutBtn}>Logout</button>
            </div>
          ) : (
            <Link to='/login' style={styles.loginBtn}>Login</Link>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          style={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
          className='mobile-only'
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={styles.mobileMenu}>
          <Link to='/' style={styles.mobileLink} onClick={() => setMenuOpen(false)}>🏠 Home</Link>
          <Link to='/products' style={styles.mobileLink} onClick={() => setMenuOpen(false)}>📦 Products</Link>
          <Link to='/contact' style={styles.mobileLink} onClick={() => setMenuOpen(false)}>📍 Contact</Link>
          <Link to='/cart' style={styles.mobileLink} onClick={() => setMenuOpen(false)}>
            🛒 Cart {cartItems.length > 0 && `(${cartItems.length})`}
          </Link>
          {userInfo ? (
            <>
              {userInfo.isAdmin && (
                <Link to='/admin' style={styles.mobileLink} onClick={() => setMenuOpen(false)}>⚙️ Admin Panel</Link>
              )}
              <button onClick={logoutHandler} style={styles.mobileLogout}>Logout</button>
            </>
          ) : (
            <Link to='/login' style={styles.mobileLinkBtn} onClick={() => setMenuOpen(false)}>Login</Link>
          )}
        </div>
      )}
    </nav>
  );
};

const styles = {
  nav: {
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 15px rgba(0,0,0,0.08)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  topBar: {
    backgroundColor: '#111111',
    padding: '6px 30px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  topBarText: { color: '#aaaaaa', fontSize: '12px' },
  navInner: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '15px 30px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    textDecoration: 'none'
  },
  logoBox: {
    backgroundColor: '#0066ff',
    width: '42px',
    height: '42px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoIcon: { fontSize: '22px' },
  logoText: {
    fontSize: '18px',
    fontWeight: '800',
    color: '#111111',
    letterSpacing: '2px'
  },
  logoSub: {
    fontSize: '9px',
    color: '#0066ff',
    letterSpacing: '2px',
    fontWeight: '600'
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    gap: '25px'
  },
  link: {
    color: '#444444',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '500'
  },
  cartBtn: {
    color: '#111111',
    textDecoration: 'none',
    position: 'relative',
    fontSize: '14px',
    fontWeight: '600',
    backgroundColor: '#f0f0f0',
    padding: '8px 16px',
    borderRadius: '6px'
  },
  badge: {
    position: 'absolute',
    top: '-8px',
    right: '-8px',
    backgroundColor: '#0066ff',
    color: 'white',
    borderRadius: '50%',
    padding: '2px 6px',
    fontSize: '10px',
    fontWeight: 'bold'
  },
  userMenu: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  userName: { color: '#0066ff', fontSize: '13px', fontWeight: '600' },
  adminBtn: {
    backgroundColor: '#e8f0ff',
    color: '#0066ff',
    border: '1px solid #0066ff',
    padding: '7px 14px',
    borderRadius: '6px',
    textDecoration: 'none',
    fontSize: '13px',
    fontWeight: '600'
  },
  loginBtn: {
    backgroundColor: '#0066ff',
    color: 'white',
    padding: '9px 22px',
    borderRadius: '6px',
    textDecoration: 'none',
    fontSize: '13px',
    fontWeight: '700'
  },
  logoutBtn: {
    backgroundColor: 'transparent',
    color: '#777',
    border: '1px solid #ddd',
    padding: '7px 14px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '12px'
  },
  hamburger: {
    display: 'none',
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: '#111',
    padding: '5px'
  },
  mobileMenu: {
    backgroundColor: '#ffffff',
    borderTop: '1px solid #eee',
    padding: '15px',
    display: 'flex',
    flexDirection: 'column',
    gap: '5px'
  },
  mobileLink: {
    color: '#111',
    textDecoration: 'none',
    padding: '12px 15px',
    borderRadius: '8px',
    fontSize: '15px',
    fontWeight: '500',
    backgroundColor: '#f8f8f8',
    display: 'block'
  },
  mobileLinkBtn: {
    backgroundColor: '#0066ff',
    color: 'white',
    padding: '12px 15px',
    borderRadius: '8px',
    fontSize: '15px',
    fontWeight: '700',
    textDecoration: 'none',
    display: 'block',
    textAlign: 'center'
  },
  mobileLogout: {
    backgroundColor: '#fff0f0',
    color: '#ff3333',
    border: 'none',
    padding: '12px 15px',
    borderRadius: '8px',
    fontSize: '15px',
    cursor: 'pointer',
    textAlign: 'left',
    fontWeight: '500'
  }
};

// Add responsive CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @media (max-width: 768px) {
    .desktop-links { display: none !important; }
    .mobile-only { display: block !important; }
    .navbar-top-bar { display: none !important; }
  }
  @media (min-width: 769px) {
    .mobile-only { display: none !important; }
  }
`;
document.head.appendChild(styleSheet);

export default Navbar;
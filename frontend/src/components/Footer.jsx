import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.section}>
          <div style={styles.logoRow}>
            <div style={styles.logoBox}><span>⚡</span></div>
            <div>
              <div style={styles.logoText}>SKARCHAN</div>
              <div style={styles.logoSub}>MOBILE & ELECTRONICS</div>
            </div>
          </div>
          <p style={styles.text}>Your trusted electronics store in Skarchan, Gilgit Baltistan. Quality products at the best prices.</p>
        </div>

        <div style={styles.section}>
          <h4 style={styles.heading}>Quick Links</h4>
          <Link to='/' style={styles.footerLink}>Home</Link>
          <Link to='/products' style={styles.footerLink}>All Products</Link>
          <Link to='/contact' style={styles.footerLink}>Contact Us</Link>
        </div>

        <div style={styles.section}>
          <h4 style={styles.heading}>Categories</h4>
          <Link to='/products?category=Mobile' style={styles.footerLink}>📱 Mobile Phones</Link>
          <Link to='/products?category=TV' style={styles.footerLink}>📺 Televisions</Link>
          <Link to='/products?category=Accessories' style={styles.footerLink}>🎧 Accessories</Link>
          <Link to='/products?category=Receiver' style={styles.footerLink}>📡 Receivers</Link>
        </div>

        <div style={styles.section}>
          <h4 style={styles.heading}>Contact Us</h4>
          <p style={styles.text}>📍 Main Bazar, Skarchan</p>
          <p style={styles.text}>    Gilgit Baltistan, Pakistan</p>
          <p style={styles.text}>📞 +92 300 0000000</p>
          <p style={styles.text}>📧 info@skarchan.com</p>
          <p style={styles.text}>🕐 Mon-Sat: 9am - 9pm</p>
        </div>
      </div>

      <div style={styles.bottom}>
        <p style={styles.copyright}>
          © 2026 Skarchan Mobile & Electronics — All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#111111',
    marginTop: '60px',
    backgroundImage:
      'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
    backgroundSize: '40px 40px',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '50px 30px 30px',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '35px'
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  logoRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '5px'
  },
  logoBox: {
    backgroundColor: '#0066ff',
    width: '36px',
    height: '36px',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px'
  },
  logoText: {
    fontSize: '16px',
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: '2px'
  },
  logoSub: {
    fontSize: '8px',
    color: '#0066ff',
    letterSpacing: '2px'
  },
  heading: {
    color: '#ffffff',
    fontSize: '12px',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    marginBottom: '5px',
    borderBottom: '1px solid #222',
    paddingBottom: '8px'
  },
  text: {
    color: '#666666',
    fontSize: '13px',
    lineHeight: '1.8'
  },
  footerLink: {
    color: '#666666',
    textDecoration: 'none',
    fontSize: '13px',
    lineHeight: '1.8'
  },
  bottom: {
    borderTop: '1px solid #222',
    padding: '20px 30px',
    textAlign: 'center'
  },
  copyright: {
    color: '#444',
    fontSize: '12px'
  }
};

export default Footer;
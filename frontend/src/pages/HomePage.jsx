import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../utils/api';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await API.get('/products');
        setProducts(data.slice(0, 8));
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div style={styles.page}>

      {/* Hero Section */}
      <div style={styles.hero}>
        <div style={styles.heroContent}>
          <div style={styles.heroBadge}>⚡ Skarchan's #1 Electronics Store</div>
          <h1 style={styles.heroTitle}>
            Premium Tech,<br />
            <span style={styles.heroBlue}>Best Prices.</span>
          </h1>
          <p style={styles.heroText}>
            Mobiles, TVs, Accessories & Receivers —
            everything you need in one place.
          </p>
          <div style={styles.heroButtons}>
            <Link to='/products' style={styles.heroBtnPrimary}>
              Shop Now →
            </Link>
            <Link to='/contact' style={styles.heroBtnSecondary}>
              Visit Store
            </Link>
          </div>
        </div>
        <div style={styles.heroRight}>
          <div style={styles.heroCard}>
            <div style={styles.heroCardIcon}>📱</div>
            <p style={styles.heroCardText}>Latest Mobiles</p>
          </div>
          <div style={styles.heroCard}>
            <div style={styles.heroCardIcon}>📺</div>
            <p style={styles.heroCardText}>Smart TVs</p>
          </div>
          <div style={styles.heroCard}>
            <div style={styles.heroCardIcon}>🎧</div>
            <p style={styles.heroCardText}>Accessories</p>
          </div>
          <div style={styles.heroCard}>
            <div style={styles.heroCardIcon}>📡</div>
            <p style={styles.heroCardText}>Receivers</p>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div style={styles.statsBar}>
        {[
          { number: '500+', label: 'Products' },
          { number: '1000+', label: 'Happy Customers' },
          { number: '5+', label: 'Years Experience' },
          { number: '100%', label: 'Original Products' }
        ].map((stat) => (
          <div key={stat.label} style={styles.statItem}>
            <span style={styles.statNumber}>{stat.number}</span>
            <span style={styles.statLabel}>{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Categories */}
      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Shop By Category</h2>
          <Link to='/products' style={styles.seeAll}>See All →</Link>
        </div>
        <div style={styles.categories}>
          {[
            { name: 'Mobile', icon: '📱', desc: 'Latest Smartphones' },
            { name: 'TV', icon: '📺', desc: 'Smart Televisions' },
            { name: 'Accessories', icon: '🎧', desc: 'Cables, Covers & More' },
            { name: 'Receiver', icon: '📡', desc: 'Satellite Receivers' },
            { name: 'Other', icon: '🔌', desc: 'Other Electronics' }
          ].map((cat) => (
            <Link
              key={cat.name}
              to={`/products?category=${cat.name}`}
              style={styles.categoryCard}
            >
              <div style={styles.categoryIconBox}>
                <span style={styles.categoryIcon}>{cat.icon}</span>
              </div>
              <h3 style={styles.categoryName}>{cat.name}</h3>
              <p style={styles.categoryDesc}>{cat.desc}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Featured Products</h2>
          <Link to='/products' style={styles.seeAll}>View All →</Link>
        </div>
        {loading ? (
          <div style={styles.loadingBox}>
            <p style={styles.loadingText}>Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <div style={styles.emptyBox}>
            <p style={styles.emptyIcon}>📦</p>
            <p style={styles.emptyText}>No products yet!</p>
          </div>
        ) : (
          <div style={styles.productsGrid}>
            {products.map((product) => (
              <Link
                key={product._id}
                to={`/products/${product._id}`}
                style={styles.productCard}
              >
                <div style={styles.productImageBox}>
                  <img
                    src={product.image || 'https://via.placeholder.com/200'}
                    alt={product.name}
                    style={styles.productImage}
                  />
                  <div style={styles.productOverlay}>
                    <span style={styles.viewBtn}>View Details</span>
                  </div>
                </div>
                <div style={styles.productInfo}>
                  <span style={styles.categoryBadge}>{product.category}</span>
                  <h3 style={styles.productName}>{product.name}</h3>
                  <p style={styles.productBrand}>{product.brand}</p>
                  <div style={styles.productBottom}>
                    <p style={styles.productPrice}>Rs. {product.price.toLocaleString()}</p>
                    <span style={{
                      ...styles.stockBadge,
                      backgroundColor: product.stock > 0 ? '#e8fff4' : '#fff0f0',
                      color: product.stock > 0 ? '#00aa55' : '#ff3333'
                    }}>
                      {product.stock > 0 ? '✓ In Stock' : '✗ Out'}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Why Choose Us */}
      <div style={styles.featuresSection}>
        <h2 style={styles.featureTitle}>Why Choose Skarchan?</h2>
        <div style={styles.featuresGrid}>
          {[
            { icon: '✅', title: 'Original Products', desc: 'All products are 100% genuine and authentic' },
            { icon: '🚚', title: 'Fast Delivery', desc: 'Quick delivery across Skarchan area' },
            { icon: '💰', title: 'Best Prices', desc: 'Competitive pricing guaranteed' },
            { icon: '🔧', title: 'After Sale Service', desc: 'Full support after your purchase' }
          ].map((f) => (
            <div key={f.title} style={styles.featureCard}>
              <div style={styles.featureIconBox}>
                <span style={styles.featureIcon}>{f.icon}</span>
              </div>
              <h3 style={styles.featureName}>{f.title}</h3>
              <p style={styles.featureDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Banner */}
      <div style={styles.ctaBanner}>
        <div style={styles.ctaContent}>
          <h2 style={styles.ctaTitle}>Visit Our Store Today!</h2>
          <p style={styles.ctaText}>
            Come visit us at Main Bazar, Skarchan — we're open 6 days a week!
          </p>
          <Link to='/contact' style={styles.ctaBtn}>Get Directions →</Link>
        </div>
      </div>

    </div>
  );
};

const styles = {
  page: { backgroundColor: '#f5f5f5' },

  // Hero
  hero: {
  backgroundColor: '#ffffff',
  padding: '60px 30px',
  maxWidth: '1200px',
  margin: '0 auto',
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '40px',
  alignItems: 'center'
},
  heroContent: { display: 'flex', flexDirection: 'column', gap: '20px' },
  heroBadge: {
    backgroundColor: '#e8f0ff',
    color: '#0066ff',
    padding: '6px 14px',
    borderRadius: '20px',
    fontSize: '13px',
    fontWeight: '600',
    width: 'fit-content'
  },
  heroTitle: {
  fontSize: 'clamp(28px, 5vw, 48px)',
  fontWeight: '800',
  color: '#111111',
  lineHeight: '1.2'
},
  heroBlue: { color: '#0066ff' },
  heroText: { color: '#666', fontSize: '16px', lineHeight: '1.7' },
  heroButtons: { display: 'flex', gap: '15px', flexWrap: 'wrap' },
  heroBtnPrimary: {
    backgroundColor: '#0066ff',
    color: 'white',
    padding: '14px 30px',
    borderRadius: '8px',
    fontWeight: '700',
    fontSize: '15px'
  },
  heroBtnSecondary: {
    backgroundColor: '#f0f0f0',
    color: '#111',
    padding: '14px 30px',
    borderRadius: '8px',
    fontWeight: '600',
    fontSize: '15px'
  },
  heroRight: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '15px'
  },
  heroCard: {
    backgroundColor: '#f8f8f8',
    border: '1px solid #eeeeee',
    borderRadius: '12px',
    padding: '25px',
    textAlign: 'center',
    transition: 'all 0.3s'
  },
  heroCardIcon: { fontSize: '35px', marginBottom: '10px' },
  heroCardText: { color: '#444', fontSize: '13px', fontWeight: '600' },

  // Stats
  statsBar: {
    backgroundColor: '#111111',
    padding: '25px 30px',
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    gap: '20px'
  },
  statItem: { textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '5px' },
  statNumber: { fontSize: '28px', fontWeight: '800', color: '#0066ff' },
  statLabel: { fontSize: '12px', color: '#888', letterSpacing: '1px', textTransform: 'uppercase' },

  // Sections
  section: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '50px 30px'
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '25px'
  },
  sectionTitle: { fontSize: '24px', fontWeight: '700', color: '#111' },
  seeAll: { color: '#0066ff', fontSize: '14px', fontWeight: '600' },

  // Categories
  categories: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
    gap: '15px'
  },
  categoryCard: {
    backgroundColor: '#ffffff',
    border: '1px solid #eeeeee',
    borderRadius: '12px',
    padding: '25px 15px',
    textAlign: 'center',
    textDecoration: 'none',
    transition: 'all 0.3s'
  },
  categoryIconBox: {
    backgroundColor: '#e8f0ff',
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 12px'
  },
  categoryIcon: { fontSize: '28px' },
  categoryName: { fontSize: '14px', fontWeight: '700', color: '#111', marginBottom: '5px' },
  categoryDesc: { fontSize: '11px', color: '#888' },

  // Products
  productsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: '20px'
  },
  productCard: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    overflow: 'hidden',
    textDecoration: 'none',
    border: '1px solid #eeeeee',
    transition: 'all 0.3s'
  },
  productImageBox: { position: 'relative', overflow: 'hidden' },
  productImage: { width: '100%', height: '200px', objectFit: 'cover' },
  productOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: '#0066ffcc',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0,
    transition: 'opacity 0.3s'
  },
  viewBtn: { color: 'white', fontWeight: '700', fontSize: '14px' },
  productInfo: { padding: '15px' },
  categoryBadge: {
    backgroundColor: '#e8f0ff',
    color: '#0066ff',
    padding: '3px 10px',
    borderRadius: '20px',
    fontSize: '11px',
    fontWeight: '600'
  },
  productName: { fontSize: '14px', fontWeight: '700', color: '#111', margin: '8px 0 4px' },
  productBrand: { fontSize: '12px', color: '#888', marginBottom: '10px' },
  productBottom: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  productPrice: { fontSize: '16px', fontWeight: '800', color: '#0066ff' },
  stockBadge: { padding: '3px 8px', borderRadius: '10px', fontSize: '11px', fontWeight: '600' },

  // Features
  featuresSection: {
    backgroundColor: '#111111',
    padding: '60px 30px'
  },
  featureTitle: {
    textAlign: 'center',
    fontSize: '28px',
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: '40px'
  },
  featuresGrid: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '25px'
  },
  featureCard: {
    backgroundColor: '#1a1a1a',
    padding: '30px',
    borderRadius: '12px',
    textAlign: 'center',
    border: '1px solid #222'
  },
  featureIconBox: {
    backgroundColor: '#0066ff22',
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 15px'
  },
  featureIcon: { fontSize: '28px' },
  featureName: { fontSize: '15px', fontWeight: '700', color: '#ffffff', marginBottom: '8px' },
  featureDesc: { fontSize: '13px', color: '#666', lineHeight: '1.6' },

  // CTA
  ctaBanner: {
    backgroundColor: '#0066ff',
    padding: '60px 30px',
    textAlign: 'center'
  },
  ctaContent: { maxWidth: '600px', margin: '0 auto' },
  ctaTitle: { fontSize: '32px', fontWeight: '800', color: 'white', marginBottom: '15px' },
  ctaText: { color: '#cce0ff', fontSize: '16px', marginBottom: '25px' },
  ctaBtn: {
    backgroundColor: 'white',
    color: '#0066ff',
    padding: '14px 35px',
    borderRadius: '8px',
    fontWeight: '700',
    fontSize: '15px'
  },

  // Loading/Empty
  loadingBox: { textAlign: 'center', padding: '50px' },
  loadingText: { color: '#888', fontSize: '16px' },
  emptyBox: { textAlign: 'center', padding: '50px' },
  emptyIcon: { fontSize: '50px', marginBottom: '10px' },
  emptyText: { color: '#888', fontSize: '16px' }
};

export default HomePage;
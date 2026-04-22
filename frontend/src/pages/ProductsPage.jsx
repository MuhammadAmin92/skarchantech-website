import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import API from '../utils/api';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [search, setSearch] = useState('');
  const location = useLocation();

  const categories = ['All', 'Mobile', 'TV', 'Accessories', 'Receiver', 'Other'];

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get('category');
    if (cat) setSelectedCategory(cat);
  }, [location]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const url = selectedCategory && selectedCategory !== 'All'
          ? `/products?category=${selectedCategory}`
          : '/products';
        const { data } = await API.get(url);
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, [selectedCategory]);

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.brand.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.page}>

      {/* Page Header */}
      <div style={styles.pageHeader}>
        <div style={styles.pageHeaderInner}>
          <h1 style={styles.pageTitle}>Our Products</h1>
          <p style={styles.pageSub}>
            Showing {filtered.length} products
            {selectedCategory && selectedCategory !== 'All'
              ? ` in ${selectedCategory}`
              : ''}
          </p>
        </div>
      </div>

      <div style={styles.container}>

        {/* Search + Filter */}
        <div style={styles.toolbar}>
          <input
            type='text'
            placeholder='🔍 Search products or brands...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.searchInput}
          />
          <div style={styles.filters}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat === 'All' ? '' : cat)}
                style={{
                  ...styles.filterBtn,
                  ...(selectedCategory === cat ||
                    (cat === 'All' && !selectedCategory)
                    ? styles.filterBtnActive
                    : {})
                }}
              >
                {cat === 'Mobile' && '📱 '}
                {cat === 'TV' && '📺 '}
                {cat === 'Accessories' && '🎧 '}
                {cat === 'Receiver' && '📡 '}
                {cat === 'Other' && '🔌 '}
                {cat === 'All' && '🛍️ '}
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products */}
        {loading ? (
          <div style={styles.loadingBox}>
            <p style={styles.loadingText}>Loading products...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div style={styles.emptyBox}>
            <p style={styles.emptyIcon}>😔</p>
            <h3 style={styles.emptyTitle}>No products found!</h3>
            <p style={styles.emptyText}>Try a different category or search term.</p>
          </div>
        ) : (
          <div style={styles.productsGrid}>
            {filtered.map((product) => (
              <Link
                key={product._id}
                to={`/products/${product._id}`}
                style={styles.productCard}
              >
                <div style={styles.imageBox}>
                  <img
                    src={product.image || 'https://via.placeholder.com/200'}
                    alt={product.name}
                    style={styles.productImage}
                  />
                  {product.stock === 0 && (
                    <div style={styles.outOfStockOverlay}>
                      <span>Out of Stock</span>
                    </div>
                  )}
                </div>
                <div style={styles.productInfo}>
                  <span style={styles.categoryBadge}>{product.category}</span>
                  <h3 style={styles.productName}>{product.name}</h3>
                  <p style={styles.productBrand}>{product.brand}</p>
                  <div style={styles.productBottom}>
                    <p style={styles.productPrice}>
                      Rs. {product.price.toLocaleString()}
                    </p>
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
  toolbar: { marginBottom: '30px' },
  searchInput: {
    width: '100%',
    padding: '14px 20px',
    borderRadius: '10px',
    border: '1px solid #e0e0e0',
    fontSize: '15px',
    marginBottom: '15px',
    backgroundColor: '#ffffff',
    outline: 'none',
    color: '#111'
  },
  filters: { display: 'flex', gap: '10px', flexWrap: 'wrap' },
  filterBtn: {
    padding: '9px 18px',
    borderRadius: '25px',
    border: '1px solid #e0e0e0',
    backgroundColor: '#ffffff',
    cursor: 'pointer',
    fontSize: '13px',
    color: '#555',
    fontWeight: '500'
  },
  filterBtnActive: {
    backgroundColor: '#0066ff',
    color: 'white',
    border: '1px solid #0066ff'
  },
  productsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
    gap: '20px'
  },
  productCard: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    overflow: 'hidden',
    textDecoration: 'none',
    border: '1px solid #eeeeee',
    transition: 'transform 0.2s, box-shadow 0.2s'
  },
  imageBox: { position: 'relative' },
  productImage: { width: '100%', height: '210px', objectFit: 'cover' },
  outOfStockOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: '700',
    fontSize: '14px'
  },
  productInfo: { padding: '15px' },
  categoryBadge: {
    backgroundColor: '#e8f0ff',
    color: '#0066ff',
    padding: '3px 10px',
    borderRadius: '20px',
    fontSize: '11px',
    fontWeight: '600'
  },
  productName: {
    fontSize: '15px',
    fontWeight: '700',
    color: '#111',
    margin: '8px 0 4px'
  },
  productBrand: { fontSize: '12px', color: '#888', marginBottom: '12px' },
  productBottom: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  productPrice: { fontSize: '17px', fontWeight: '800', color: '#0066ff' },
  stockBadge: {
    padding: '3px 10px',
    borderRadius: '10px',
    fontSize: '11px',
    fontWeight: '600'
  },
  loadingBox: { textAlign: 'center', padding: '80px' },
  loadingText: { color: '#888', fontSize: '16px' },
  emptyBox: { textAlign: 'center', padding: '80px' },
  emptyIcon: { fontSize: '50px', marginBottom: '15px' },
  emptyTitle: { fontSize: '20px', color: '#111', marginBottom: '8px' },
  emptyText: { color: '#888', fontSize: '14px' }
};

export default ProductsPage;
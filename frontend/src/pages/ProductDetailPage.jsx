import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../utils/api';
import { useCart } from '../context/CartContext';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await API.get(`/products/${id}`);
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const addToCartHandler = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) return <p style={styles.loading}>Loading...</p>;
  if (!product) return <p style={styles.loading}>Product nahi mila!</p>;

  return (
    <div style={styles.container}>

      {/* Back Button */}
      <button onClick={() => navigate(-1)} style={styles.backBtn}>
        ← Back
      </button>

      <div style={styles.productContainer}>

        {/* Product Image */}
        <div style={styles.imageSection}>
          <img
            src={product.image || 'https://via.placeholder.com/400'}
            alt={product.name}
            style={styles.image}
          />
        </div>

        {/* Product Info */}
        <div style={styles.infoSection}>
          <span style={styles.categoryBadge}>{product.category}</span>
          <h1 style={styles.productName}>{product.name}</h1>
          <p style={styles.brand}>Brand: {product.brand}</p>
          <h2 style={styles.price}>Rs. {product.price}</h2>

          {/* Stock */}
          <div style={styles.stockSection}>
            <span style={{
              ...styles.stockBadge,
              backgroundColor: product.stock > 0 ? '#28a745' : '#dc3545'
            }}>
              {product.stock > 0
                ? `✅ In Stock (${product.stock} available)`
                : '❌ Out of Stock'}
            </span>
          </div>

          {/* Description */}
          <div style={styles.descSection}>
            <h3 style={styles.descTitle}>Description</h3>
            <p style={styles.description}>{product.description}</p>
          </div>

          {/* Buttons */}
          <div style={styles.buttons}>
            {product.stock > 0 ? (
              <>
                <button
                  onClick={addToCartHandler}
                  style={{
                    ...styles.cartBtn,
                    backgroundColor: added ? '#28a745' : '#e94560'
                  }}
                >
                  {added ? '✅ Added to Cart!' : '🛒 Add to Cart'}
                </button>
                <button
                  onClick={() => {
                    addToCart(product);
                    navigate('/cart');
                  }}
                  style={styles.buyBtn}
                >
                  Buy Now →
                </button>
              </>
            ) : (
              <button style={styles.disabledBtn} disabled>
                Out of Stock
              </button>
            )}
          </div>

          {/* Extra Info */}
          <div style={styles.extraInfo}>
            <p>🚚 Fast Delivery in Skarchan Area</p>
            <p>💰 Cash on Delivery Available</p>
            <p>✅ 100% Original Product</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1000px',
    margin: '0 auto'
  },
  backBtn: {
    backgroundColor: 'transparent',
    border: '1px solid #ddd',
    padding: '8px 16px',
    borderRadius: '5px',
    cursor: 'pointer',
    marginBottom: '20px',
    fontSize: '14px'
  },
  productContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '40px',
    backgroundColor: 'white',
    borderRadius: '15px',
    padding: '30px',
    boxShadow: '0 2px 15px rgba(0,0,0,0.1)'
  },
  imageSection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: '100%',
    maxHeight: '400px',
    objectFit: 'contain',
    borderRadius: '10px'
  },
  infoSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  categoryBadge: {
    backgroundColor: '#f0f0f0',
    color: '#555',
    padding: '4px 12px',
    borderRadius: '15px',
    fontSize: '12px',
    width: 'fit-content'
  },
  productName: {
    fontSize: '26px',
    color: '#1a1a2e',
    margin: 0
  },
  brand: {
    color: '#888',
    fontSize: '14px',
    margin: 0
  },
  price: {
    fontSize: '28px',
    color: '#e94560',
    margin: 0
  },
  stockSection: {
    margin: 0
  },
  stockBadge: {
    color: 'white',
    padding: '6px 14px',
    borderRadius: '20px',
    fontSize: '13px'
  },
  descSection: {
    borderTop: '1px solid #eee',
    paddingTop: '15px'
  },
  descTitle: {
    fontSize: '16px',
    color: '#1a1a2e',
    marginBottom: '8px'
  },
  description: {
    color: '#666',
    fontSize: '14px',
    lineHeight: '1.6'
  },
  buttons: {
    display: 'flex',
    gap: '15px'
  },
  cartBtn: {
    flex: 1,
    padding: '12px',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '15px',
    fontWeight: 'bold'
  },
  buyBtn: {
    flex: 1,
    padding: '12px',
    backgroundColor: '#1a1a2e',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '15px',
    fontWeight: 'bold'
  },
  disabledBtn: {
    flex: 1,
    padding: '12px',
    backgroundColor: '#ccc',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'not-allowed',
    fontSize: '15px'
  },
  extraInfo: {
    backgroundColor: '#f8f9fa',
    padding: '15px',
    borderRadius: '8px',
    fontSize: '13px',
    color: '#555',
    lineHeight: '2'
  },
  loading: {
    textAlign: 'center',
    marginTop: '50px',
    color: '#888'
  }
};

export default ProductDetailPage;
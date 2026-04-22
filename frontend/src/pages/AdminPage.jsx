import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';
import { useAuth } from '../context/AuthContext';

const AdminPage = () => {
  const { userInfo } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Mobile');
  const [brand, setBrand] = useState('');
  const [stock, setStock] = useState('');
  const [image, setImage] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [editProduct, setEditProduct] = useState(null);

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) navigate('/login');
  }, [userInfo, navigate]);

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await API.get('/products');
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      const { data } = await API.get('/orders');
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  const resetForm = () => {
    setName(''); setDescription(''); setPrice('');
    setCategory('Mobile'); setBrand(''); setStock('');
    setImage(null); setEditProduct(null); setMessage('');
  };

  const submitHandler = async () => {
    if (!name || !description || !price || !brand || !stock) {
      setMessage('error:Please fill in all fields!');
      return;
    }
    setFormLoading(true);
    setMessage('');
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('brand', brand);
    formData.append('stock', stock);
    if (image) formData.append('image', image);
    try {
      if (editProduct) {
        await API.put(`/products/${editProduct._id}`, formData);
        setMessage('success:Product updated successfully!');
      } else {
        await API.post('/products', formData);
        setMessage('success:Product added successfully!');
      }
      resetForm();
      fetchProducts();
    } catch (error) {
      setMessage('error:' + (error.response?.data?.message || 'Something went wrong!'));
    }
    setFormLoading(false);
  };

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await API.delete(`/products/${id}`);
        fetchProducts();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const editHandler = (product) => {
    setEditProduct(product);
    setName(product.name);
    setDescription(product.description);
    setPrice(product.price);
    setCategory(product.category);
    setBrand(product.brand);
    setStock(product.stock);
    setActiveTab('add');
    window.scrollTo(0, 0);
  };

  const updateOrderStatus = async (id, status) => {
    try {
      await API.put(`/orders/${id}`, { status });
      fetchOrders();
    } catch (error) {
      console.log(error);
    }
  };

  const msgType = message.startsWith('success:') ? 'success' : 'error';
  const msgText = message.replace('success:', '').replace('error:', '');

  return (
    <div style={styles.page}>

      {/* Page Header */}
      <div style={styles.pageHeader}>
        <div style={styles.pageHeaderInner}>
          <h1 style={styles.pageTitle}>Admin Panel</h1>
          <p style={styles.pageSub}>Manage your store — products, orders & more</p>
        </div>
      </div>

      <div style={styles.container}>

        {/* Stats */}
        <div style={styles.stats}>
          {[
            { icon: '📦', number: products.length, label: 'Total Products', color: '#0066ff' },
            { icon: '🛒', number: orders.length, label: 'Total Orders', color: '#00aa55' },
            { icon: '⏳', number: orders.filter(o => o.status === 'Pending').length, label: 'Pending Orders', color: '#ff9900' },
            { icon: '✅', number: orders.filter(o => o.status === 'Delivered').length, label: 'Delivered', color: '#00aa55' }
          ].map((stat) => (
            <div key={stat.label} style={styles.statCard}>
              <div style={{ ...styles.statIconBox, backgroundColor: stat.color + '22' }}>
                <span style={styles.statIcon}>{stat.icon}</span>
              </div>
              <div>
                <h3 style={{ ...styles.statNumber, color: stat.color }}>{stat.number}</h3>
                <p style={styles.statLabel}>{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={styles.tabs}>
          {[
            { id: 'products', label: '📦 Products' },
            { id: 'add', label: editProduct ? '✏️ Edit Product' : '➕ Add Product' },
            { id: 'orders', label: '🛒 Orders' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                if (tab.id === 'add') resetForm();
                setActiveTab(tab.id);
              }}
              style={{
                ...styles.tab,
                ...(activeTab === tab.id ? styles.tabActive : {})
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div style={styles.section}>
            <div style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>All Products ({products.length})</h2>
              <button
                onClick={() => { resetForm(); setActiveTab('add'); }}
                style={styles.addBtn}
              >
                + Add New Product
              </button>
            </div>

            {loading ? (
              <p style={styles.loadingText}>Loading products...</p>
            ) : products.length === 0 ? (
              <div style={styles.emptyBox}>
                <p style={styles.emptyIcon}>📦</p>
                <p style={styles.emptyText}>No products yet. Add your first product!</p>
              </div>
            ) : (
              <div style={styles.productsTable}>
                {products.map((product) => (
                  <div key={product._id} style={styles.productRow}>
                    <img
                      src={product.image || 'https://via.placeholder.com/60'}
                      alt={product.name}
                      style={styles.productImg}
                    />
                    <div style={styles.productDetails}>
                      <p style={styles.productName}>{product.name}</p>
                      <p style={styles.productMeta}>{product.category} • {product.brand}</p>
                    </div>
                    <p style={styles.productPrice}>Rs. {product.price.toLocaleString()}</p>
                    <span style={{
                      ...styles.stockPill,
                      backgroundColor: product.stock > 0 ? '#e8fff4' : '#fff0f0',
                      color: product.stock > 0 ? '#00aa55' : '#ff3333'
                    }}>
                      Stock: {product.stock}
                    </span>
                    <div style={styles.actionBtns}>
                      <button onClick={() => editHandler(product)} style={styles.editBtn}>✏️ Edit</button>
                      <button onClick={() => deleteHandler(product._id)} style={styles.deleteBtn}>🗑️ Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Add/Edit Product Tab */}
        {activeTab === 'add' && (
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>
              {editProduct ? '✏️ Edit Product' : '➕ Add New Product'}
            </h2>

            {message && (
              <div style={{
                ...styles.message,
                backgroundColor: msgType === 'success' ? '#e8fff4' : '#fff0f0',
                color: msgType === 'success' ? '#00aa55' : '#ff3333',
                border: `1px solid ${msgType === 'success' ? '#00aa5533' : '#ff333333'}`
              }}>
                {msgType === 'success' ? '✅' : '⚠️'} {msgText}
              </div>
            )}

            <div style={styles.formGrid}>
              <div style={styles.formLeft}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Product Name *</label>
                  <input
                    type='text'
                    placeholder='e.g. Samsung Galaxy A15'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={styles.input}
                  />
                </div>

                <div style={styles.twoCol}>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Brand *</label>
                    <input
                      type='text'
                      placeholder='e.g. Samsung'
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      style={styles.input}
                    />
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Category *</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      style={styles.input}
                    >
                      <option value='Mobile'>📱 Mobile</option>
                      <option value='TV'>📺 TV</option>
                      <option value='Accessories'>🎧 Accessories</option>
                      <option value='Receiver'>📡 Receiver</option>
                      <option value='Other'>🔌 Other</option>
                    </select>
                  </div>
                </div>

                <div style={styles.twoCol}>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Price (Rs.) *</label>
                    <input
                      type='number'
                      placeholder='e.g. 45000'
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      style={styles.input}
                    />
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Stock Quantity *</label>
                    <input
                      type='number'
                      placeholder='e.g. 10'
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                      style={styles.input}
                    />
                  </div>
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Description *</label>
                  <textarea
                    placeholder='Write product description...'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    style={styles.textarea}
                  />
                </div>
              </div>

              <div style={styles.formRight}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Product Image</label>
                  <div style={styles.imageUpload}>
                    {image ? (
                      <div style={styles.imagePreview}>
                        <img
                          src={URL.createObjectURL(image)}
                          alt='preview'
                          style={styles.previewImg}
                        />
                        <button onClick={() => setImage(null)} style={styles.removeImageBtn}>
                          ✕ Remove
                        </button>
                      </div>
                    ) : (
                      <label style={styles.uploadLabel}>
                        <span style={styles.uploadIcon}>📸</span>
                        <span style={styles.uploadText}>Click to upload image</span>
                        <span style={styles.uploadSub}>JPG, PNG, WEBP supported</span>
                        <input
                          type='file'
                          accept='image/*'
                          onChange={(e) => setImage(e.target.files[0])}
                          style={{ display: 'none' }}
                        />
                      </label>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div style={styles.formBtns}>
              <button
                onClick={submitHandler}
                disabled={formLoading}
                style={{ ...styles.submitBtn, opacity: formLoading ? 0.7 : 1 }}
              >
                {formLoading ? 'Saving...' : editProduct ? '✅ Update Product' : '➕ Add Product'}
              </button>
              {editProduct && (
                <button onClick={resetForm} style={styles.cancelBtn}>Cancel</button>
              )}
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>All Orders ({orders.length})</h2>
            {orders.length === 0 ? (
              <div style={styles.emptyBox}>
                <p style={styles.emptyIcon}>🛒</p>
                <p style={styles.emptyText}>No orders yet!</p>
              </div>
            ) : (
              <div style={styles.ordersTable}>
                {orders.map((order) => (
                  <div key={order._id} style={styles.orderCard}>
                    <div style={styles.orderTop}>
                      <div>
                        <p style={styles.orderId}>Order # {order._id.slice(-8).toUpperCase()}</p>
                        <p style={styles.orderDate}>{new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                      </div>
                      <span style={{
                        ...styles.statusPill,
                        backgroundColor:
                          order.status === 'Delivered' ? '#e8fff4' :
                          order.status === 'Cancelled' ? '#fff0f0' :
                          order.status === 'Shipped' ? '#e8f4ff' :
                          order.status === 'Processing' ? '#fff8e8' : '#f5f5f5',
                        color:
                          order.status === 'Delivered' ? '#00aa55' :
                          order.status === 'Cancelled' ? '#ff3333' :
                          order.status === 'Shipped' ? '#0066ff' :
                          order.status === 'Processing' ? '#ff9900' : '#888'
                      }}>
                        {order.status}
                      </span>
                    </div>

                    <div style={styles.orderDetails}>
                      <div style={styles.orderInfo}>
                        <p style={styles.orderInfoText}>👤 {order.shippingAddress?.name}</p>
                        <p style={styles.orderInfoText}>📞 {order.shippingAddress?.phone}</p>
                        <p style={styles.orderInfoText}>📍 {order.shippingAddress?.address}, {order.shippingAddress?.city}</p>
                        <p style={styles.orderTotal}>Rs. {order.totalPrice?.toLocaleString()}</p>
                      </div>
                      <div style={styles.statusUpdate}>
                        <label style={styles.label}>Update Status</label>
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                          style={styles.statusSelect}
                        >
                          <option value='Pending'>Pending</option>
                          <option value='Processing'>Processing</option>
                          <option value='Shipped'>Shipped</option>
                          <option value='Delivered'>Delivered</option>
                          <option value='Cancelled'>Cancelled</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
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
stats: {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '15px',
  marginBottom: '25px',
  backgroundColor: '#ffffff',
  padding: '20px',
  borderRadius: '12px',
  border: '1px solid #eeeeee',
  display: 'flex',
  alignItems: 'center',
  gap: '15px'
},
  statIconBox: { width: '48px', height: '48px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  statIcon: { fontSize: '22px' },
  statNumber: { fontSize: '26px', fontWeight: '800', marginBottom: '2px' },
  statLabel: { fontSize: '12px', color: '#888' },
  tabs: { display: 'flex', gap: '10px', marginBottom: '20px' },
  tab: {
    padding: '11px 22px',
    borderRadius: '8px',
    border: '1px solid #e0e0e0',
    backgroundColor: '#ffffff',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    color: '#555'
  },
  tabActive: { backgroundColor: '#0066ff', color: 'white', border: '1px solid #0066ff' },
  section: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '25px',
    border: '1px solid #eeeeee'
  },
  sectionHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  sectionTitle: { fontSize: '18px', fontWeight: '700', color: '#111' },
  addBtn: {
    backgroundColor: '#0066ff',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600'
  },
  loadingText: { color: '#888', textAlign: 'center', padding: '30px' },
  emptyBox: { textAlign: 'center', padding: '50px' },
  emptyIcon: { fontSize: '50px', marginBottom: '10px' },
  emptyText: { color: '#888', fontSize: '15px' },
  productsTable: { display: 'flex', flexDirection: 'column', gap: '10px' },
  productRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    padding: '15px',
    backgroundColor: '#f8f8f8',
    borderRadius: '10px',
    border: '1px solid #eeeeee'
  },
  productImg: { width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #eee' },
  productDetails: { flex: 1 },
  productName: { fontSize: '14px', fontWeight: '700', color: '#111', marginBottom: '3px' },
  productMeta: { fontSize: '12px', color: '#888' },
  productPrice: { fontSize: '15px', fontWeight: '800', color: '#0066ff', minWidth: '110px' },
  stockPill: { padding: '5px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', whiteSpace: 'nowrap' },
  actionBtns: { display: 'flex', gap: '8px' },
  editBtn: { backgroundColor: '#e8f0ff', color: '#0066ff', border: 'none', padding: '7px 14px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: '600' },
  deleteBtn: { backgroundColor: '#fff0f0', color: '#ff3333', border: 'none', padding: '7px 14px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: '600' },
  message: { padding: '13px 16px', borderRadius: '8px', marginBottom: '20px', fontSize: '14px', fontWeight: '600' },
formGrid: {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '25px',
  marginBottom: '20px'
},  formLeft: { display: 'flex', flexDirection: 'column', gap: '18px' },
  formRight: { display: 'flex', flexDirection: 'column', gap: '18px' },
  twoCol: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '7px' },
  label: { fontSize: '13px', fontWeight: '700', color: '#444' },
  input: { padding: '12px 15px', borderRadius: '8px', border: '1px solid #e0e0e0', fontSize: '14px', outline: 'none', backgroundColor: '#f8f8f8', color: '#111' },
  textarea: { padding: '12px 15px', borderRadius: '8px', border: '1px solid #e0e0e0', fontSize: '14px', outline: 'none', backgroundColor: '#f8f8f8', color: '#111', resize: 'vertical' },
  imageUpload: { border: '2px dashed #e0e0e0', borderRadius: '10px', overflow: 'hidden' },
  uploadLabel: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', cursor: 'pointer', gap: '8px' },
  uploadIcon: { fontSize: '35px' },
  uploadText: { fontSize: '14px', fontWeight: '600', color: '#444' },
  uploadSub: { fontSize: '12px', color: '#888' },
  imagePreview: { position: 'relative' },
  previewImg: { width: '100%', height: '200px', objectFit: 'cover' },
  removeImageBtn: { position: 'absolute', top: '10px', right: '10px', backgroundColor: '#ff3333', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer', fontSize: '12px' },
  formBtns: { display: 'flex', gap: '12px' },
  submitBtn: { backgroundColor: '#0066ff', color: 'white', border: 'none', padding: '13px 30px', borderRadius: '8px', cursor: 'pointer', fontSize: '15px', fontWeight: '700' },
  cancelBtn: { backgroundColor: '#f0f0f0', color: '#555', border: 'none', padding: '13px 25px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '600' },
  ordersTable: { display: 'flex', flexDirection: 'column', gap: '15px' },
  orderCard: { backgroundColor: '#f8f8f8', borderRadius: '10px', padding: '20px', border: '1px solid #eeeeee' },
  orderTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' },
  orderId: { fontSize: '15px', fontWeight: '800', color: '#111', marginBottom: '3px' },
  orderDate: { fontSize: '12px', color: '#888' },
  statusPill: { padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: '700' },
  orderDetails: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' },
  orderInfo: { display: 'flex', flexDirection: 'column', gap: '4px' },
  orderInfoText: { fontSize: '13px', color: '#555' },
  orderTotal: { fontSize: '16px', fontWeight: '800', color: '#0066ff', marginTop: '5px' },
  statusUpdate: { display: 'flex', flexDirection: 'column', gap: '7px' },
  statusSelect: { padding: '9px 14px', borderRadius: '8px', border: '1px solid #e0e0e0', fontSize: '13px', cursor: 'pointer', backgroundColor: '#ffffff', color: '#111', outline: 'none' }
};

export default AdminPage;
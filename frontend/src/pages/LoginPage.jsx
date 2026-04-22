import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../utils/api';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const submitHandler = async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await API.post('/auth/login', { email, password });
      login(data);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password!');
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.left}>
        <div style={styles.leftContent}>
          <div style={styles.logoBox}>
            <span style={styles.logoIcon}>⚡</span>
          </div>
          <h1 style={styles.brandName}>SKARCHAN</h1>
          <p style={styles.brandSub}>MOBILE & ELECTRONICS</p>
          <p style={styles.brandText}>
            Your trusted electronics store in Skarchan, Gilgit Baltistan.
          </p>
          <div style={styles.features}>
            {['100% Original Products', 'Best Prices Guaranteed', 'Fast Local Delivery', 'After Sale Support'].map(f => (
              <div key={f} style={styles.featureItem}>
                <span style={styles.featureCheck}>✓</span>
                <span style={styles.featureText}>{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={styles.right}>
        <div style={styles.formBox}>
          <h2 style={styles.title}>Welcome Back!</h2>
          <p style={styles.subtitle}>Login to your account to continue shopping</p>

          {error && <div style={styles.error}>⚠️ {error}</div>}

          <div style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Email Address</label>
              <input
                type='email'
                placeholder='Enter your email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
                autoComplete="username"
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Password</label>
              <input
                type='password'
                placeholder='Enter your password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
                autoComplete="current-password"
              />
            </div>

            <button
              onClick={submitHandler}
              disabled={loading}
              style={{ ...styles.loginBtn, opacity: loading ? 0.7 : 1 }}
            >
              {loading ? 'Logging in...' : 'Login →'}
            </button>

            {/* Social Login */}
            <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0' }}>
              <div style={{ flex: 1, height: 1, background: '#eee' }} />
              <span style={{ margin: '0 12px', color: '#aaa', fontSize: 13 }}>OR</span>
              <div style={{ flex: 1, height: 1, background: '#eee' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '10px' }}>
              <button
                onClick={() => { window.location.assign('http://localhost:5000/api/auth/google') }}
                style={{
                  background: '#fff',
                  color: '#111',
                  border: '1px solid #e0e0e0',
                  padding: '12px',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '15px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
                type="button"
              >
                <span>🔴</span> Continue with Google
              </button>
              <button
                onClick={() => { window.location.assign('http://localhost:5000/api/auth/facebook') }}
                style={{
                  background: '#fff',
                  color: '#111',
                  border: '1px solid #e0e0e0',
                  padding: '12px',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '15px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
                type="button"
              >
                <span>🔵</span> Continue with Facebook
              </button>
            </div>
          </div>

          <p style={styles.registerText}>
            Don't have an account?{' '}
            <Link to='/register' style={styles.registerLink}>Create Account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    minHeight: '100vh',
    margin: '-20px -30px'
  },
  left: {
    backgroundColor: '#111111',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '50px'
  },
  leftContent: {
    maxWidth: '380px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  logoBox: {
    backgroundColor: '#0066ff',
    width: '56px',
    height: '56px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '28px'
  },
  brandName: {
    fontSize: '32px',
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: '3px'
  },
  brandSub: {
    fontSize: '11px',
    color: '#0066ff',
    letterSpacing: '3px',
    fontWeight: '600'
  },
  brandText: {
    color: '#666',
    fontSize: '14px',
    lineHeight: '1.7'
  },
  features: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginTop: '10px'
  },
  featureItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  featureCheck: {
    backgroundColor: '#0066ff22',
    color: '#0066ff',
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '13px',
    fontWeight: '700',
    flexShrink: 0
  },
  featureText: {
    color: '#aaa',
    fontSize: '14px'
  },
  right: {
    backgroundColor: '#f5f5f5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '50px'
  },
  formBox: {
    backgroundColor: '#ffffff',
    padding: '45px',
    borderRadius: '16px',
    width: '100%',
    maxWidth: '420px',
    boxShadow: '0 4px 25px rgba(0,0,0,0.08)'
  },
  title: {
    fontSize: '26px',
    fontWeight: '800',
    color: '#111',
    marginBottom: '8px'
  },
  subtitle: {
    color: '#888',
    fontSize: '14px',
    marginBottom: '25px'
  },
  error: {
    backgroundColor: '#fff0f0',
    color: '#ff3333',
    padding: '12px 15px',
    borderRadius: '8px',
    marginBottom: '20px',
    fontSize: '14px'
  },
  form: { display: 'flex', flexDirection: 'column', gap: '20px' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '7px' },
  label: { fontSize: '13px', fontWeight: '700', color: '#444' },
  input: {
    padding: '13px 16px',
    borderRadius: '8px',
    border: '1px solid #e0e0e0',
    fontSize: '15px',
    outline: 'none',
    backgroundColor: '#f8f8f8',
    color: '#111'
  },
  loginBtn: {
    backgroundColor: '#0066ff',
    color: 'white',
    border: 'none',
    padding: '14px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '700',
    marginTop: '5px'
  },
  registerText: {
    textAlign: 'center',
    marginTop: '20px',
    color: '#888',
    fontSize: '14px'
  },
  registerLink: {
    color: '#0066ff',
    fontWeight: '700'
  }
};

export default LoginPage;
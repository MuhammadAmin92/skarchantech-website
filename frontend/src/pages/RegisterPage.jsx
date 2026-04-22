import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../utils/api';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const submitHandler = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const { data } = await API.post('/auth/register', {
        name, email, phone, password
      });
      login(data);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed!');
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
            Create your account and start shopping the best electronics in Skarchan!
          </p>
          <div style={styles.features}>
            {['Track your orders easily', 'Save your shipping details', 'Get exclusive deals', 'Fast checkout experience'].map(f => (
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
          <h2 style={styles.title}>Create Account</h2>
          <p style={styles.subtitle}>Join Skarchan Mobile & Electronics today</p>

          {error && <div style={styles.error}>⚠️ {error}</div>}

          <div style={styles.form}>
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

            {/* Social Login */}
<div style={styles.divider}>
  <div style={styles.dividerLine} />
  <span style={styles.dividerText}>OR</span>
  <div style={styles.dividerLine} />
</div>

<div style={styles.socialBtns}>
  <a
    href='http://localhost:5000/api/auth/google'
    style={styles.googleBtn}
  >
    <span>🔴</span> Continue with Google
  </a>
  <a
    href='http://localhost:5000/api/auth/facebook'
    style={styles.facebookBtn}
  >
    <span>🔵</span> Continue with Facebook
  </a>
</div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Email Address</label>
              <input
                type='email'
                placeholder='Enter your email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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

            <div style={styles.row}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Password</label>
                <input
                  type='password'
                  placeholder='Create password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={styles.input}
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Confirm Password</label>
                <input
                  type='password'
                  placeholder='Repeat password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  style={styles.input}
                />
              </div>
            </div>

            <button
              onClick={submitHandler}
              disabled={loading}
              style={{ ...styles.registerBtn, opacity: loading ? 0.7 : 1 }}
            >
              {loading ? 'Creating Account...' : 'Create Account →'}
            </button>
          </div>

          <p style={styles.loginText}>
            Already have an account?{' '}
            <Link to='/login' style={styles.loginLink}>Login</Link>
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
  brandText: { color: '#666', fontSize: '14px', lineHeight: '1.7' },
  features: { display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '10px' },
  featureItem: { display: 'flex', alignItems: 'center', gap: '12px' },
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
  featureText: { color: '#aaa', fontSize: '14px' },
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
    maxWidth: '460px',
    boxShadow: '0 4px 25px rgba(0,0,0,0.08)'
  },
  title: { fontSize: '26px', fontWeight: '800', color: '#111', marginBottom: '8px' },
  subtitle: { color: '#888', fontSize: '14px', marginBottom: '25px' },
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
divider: {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  margin: '5px 0'
},
dividerLine: {
  flex: 1,
  height: '1px',
  backgroundColor: '#e0e0e0'
},
dividerText: {
  color: '#888',
  fontSize: '12px',
  fontWeight: '600'
},
socialBtns: {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px'
},
googleBtn: {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px',
  padding: '12px',
  borderRadius: '8px',
  border: '1px solid #e0e0e0',
  backgroundColor: '#ffffff',
  color: '#111',
  fontSize: '14px',
  fontWeight: '600',
  cursor: 'pointer',
  textDecoration: 'none'
},
facebookBtn: {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px',
  padding: '12px',
  borderRadius: '8px',
  border: '1px solid #e0e0e0',
  backgroundColor: '#1877f2',
  color: 'white',
  fontSize: '14px',
  fontWeight: '600',
  cursor: 'pointer',
  textDecoration: 'none'
},
  registerBtn: {
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
  loginText: { textAlign: 'center', marginTop: '20px', color: '#888', fontSize: '14px' },
  loginLink: { color: '#0066ff', fontWeight: '700' }
};

export default RegisterPage;
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const SocialLoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const data = params.get('data');
    if (data) {
      try {
        const user = JSON.parse(data);
        login(user);
        navigate('/');
      } catch (err) {
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, []);

  return (
    <div style={styles.container}>
      <p style={styles.text}>Logging you in...</p>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '60vh'
  },
  text: {
    fontSize: '18px',
    color: '#888'
  }
};

export default SocialLoginPage;
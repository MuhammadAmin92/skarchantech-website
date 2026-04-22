import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import SocialLoginPage from './pages/SocialLoginPage';

const App = () => {
  return (
    <div>
      <Navbar />
      <main style={{ minHeight: '80vh', padding: '20px 30px' }}>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/products' element={<ProductsPage />} />
          <Route path='/products/:id' element={<ProductDetailPage />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/checkout' element={<CheckoutPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/contact' element={<ContactPage />} />
          <Route path='/admin' element={<AdminPage />} />
          <Route path='/order-success' element={<OrderSuccessPage />} />
          <Route path='/social-login' element={<SocialLoginPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;

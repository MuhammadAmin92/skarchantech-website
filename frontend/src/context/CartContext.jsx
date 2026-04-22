import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Cart mein product add karo
  const addToCart = (product) => {
    const exists = cartItems.find(item => item._id === product._id);
    if (exists) {
      setCartItems(cartItems.map(item =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  // Cart se product hatao
  const removeFromCart = (id) => {
    setCartItems(cartItems.filter(item => item._id !== id));
  };

  // Quantity update karo
  const updateQuantity = (id, quantity) => {
    if (quantity === 0) {
      removeFromCart(id);
      return;
    }
    setCartItems(cartItems.map(item =>
      item._id === id ? { ...item, quantity } : item
    ));
  };

  // Total price
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity, 0
  );

  // Cart clear karo
  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      totalPrice,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
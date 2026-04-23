# SkarchanTech 🛒

SkarchanTech is a modern e-commerce web application built using the MERN stack. It allows users to 
browse mobile phones and accessories, manage their cart, and place orders.

## 🚀 Features
- User authentication (Login / Signup)
- Browse and search products
- Add to cart & manage items
- Secure checkout system
- Responsive design (mobile & desktop)

## 🛠️ Tech Stack
- Frontend: React.js, Tailwind CSS
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JWT

## 📁 Project Structure
skarchan-shop/
│
├── backend/                    # Express.js API Server
│   ├── config/
│   │   ├── db.js               # MongoDB connection
│   │   └── passport.js         # Google OAuth config
│   ├── controllers/
│   │   ├── authController.js   # Register, login, logout
│   │   ├── productController.js
│   │   ├── cartController.js
│   │   └── orderController.js
│   ├── middleware/
│   │   ├── authMiddleware.js   # JWT verification
│   │   └── errorMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Order.js
│   │   └── Cart.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   ├── cartRoutes.js
│   │   └── orderRoutes.js
│   ├── .env.example            # Environment variables template
│   ├── server.js               # Entry point
│   └── package.json
│



├── frontend/                   # React.js Application
│   ├── public/
│   ├── src/
│   │   ├── components/         # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── ...
│   │   ├── pages/              # Page components
│   │   │   ├── HomePage.jsx
│   │   │   ├── ShopPage.jsx
│   │   │   ├── ProductDetail.jsx
│   │   │   ├── CartPage.jsx
│   │   │   ├── CheckoutPage.jsx
│   │   │   ├── AboutPage.jsx
│   │   │   └── ContactPage.jsx
│   │   ├── context/            # React Context (state management)
│   │   ├── hooks/              # Custom hooks
│   │   ├── utils/              # Helper functions
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── .gitignore
└── README.md



**Run application**
# Backend
cd backend
npm run dev

# Frontend
cd frontend
npm run dev

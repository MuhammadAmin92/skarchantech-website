const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Normal routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Google routes
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    const token = generateToken(req.user._id);
    const user = {
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      isAdmin: req.user.isAdmin,
      token
    };
    res.redirect(`${process.env.CLIENT_URL}/social-login?data=${JSON.stringify(user)}`);
  }
);

// Facebook routes
router.get('/facebook',
  passport.authenticate('facebook', { scope: ['email'] })
);

router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  (req, res) => {
    const token = generateToken(req.user._id);
    const user = {
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      isAdmin: req.user.isAdmin,
      token
    };
    res.redirect(`${process.env.CLIENT_URL}/social-login?data=${JSON.stringify(user)}`);
  }
);

module.exports = router;
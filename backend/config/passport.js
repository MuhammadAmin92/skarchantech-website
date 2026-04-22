const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/User');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// Google Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/api/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ email: profile.emails[0].value });
    if (user) {
      return done(null, user);
    }
    user = await User.create({
      name: profile.displayName,
      email: profile.emails[0].value,
      password: 'google_' + profile.id,
      phone: ''
    });
    done(null, user);
  } catch (err) {
    done(err, null);
  }
}));

// Facebook Strategy
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: '/api/auth/facebook/callback',
  profileFields: ['id', 'displayName', 'emails']
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const email = profile.emails?.[0]?.value || `fb_${profile.id}@skarchan.com`;
    let user = await User.findOne({ email });
    if (user) {
      return done(null, user);
    }
    user = await User.create({
      name: profile.displayName,
      email,
      password: 'facebook_' + profile.id,
      phone: ''
    });
    done(null, user);
  } catch (err) {
    done(err, null);
  }
}));

module.exports = passport;
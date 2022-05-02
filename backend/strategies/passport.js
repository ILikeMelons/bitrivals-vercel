var BnetStrategy = require('passport-bnet').Strategy;
var SteamStrategy = require('passport-steam').Strategy;

var passport = require('passport');

const domain = 'bitrivals.gg';

// Use the BnetStrategy within Passport.
passport.use(new BnetStrategy({
    clientID: process.env.BATTLENET_CLIENT_ID,
    clientSecret: process.env.BATTLENET_CLIENT_SECRET, 
    callbackURL: "https://www.bitrivals.gg/",
    region: "us",
    scope: "openid profile email"
}, function(accessToken, refreshToken, profile, done) {
    (profile)
    return done(null, profile);
}));

passport.use(new SteamStrategy({
    returnURL: 'https://localhost:3000/api/auth0/callback/steam',
    realm: 'https://localhost:3000/',
    apiKey: process.env.STEAM_API_KEY
  },
  function(identifier, profile, done) {
      (identifier)
    profile.identifier = identifier;
    return done(null, profile);
  }
));

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

export default passport;


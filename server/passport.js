import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import User from '../models/User';
import { dbConfig } from './config';
import cuid from 'cuid';

const localOptions = {
   usernameField: 'email',
   passwordField: 'password',
   passReqToCallback: true
};


const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: dbConfig.secret,
};


const jwtSessionOptions = {
  jwtFromRequest: (req) => {
    let token = null;
    if (req && req.session) {
      token = req.session.token;
      console.log(token)
    }
    return token;
  },
  secretOrKey: dbConfig.secret
}


const localCallback = (req, email, pass, done) => {
   
   console.log("PASSPORT Local callback")

   User.findOne({email})
      .then((user) => {
        console.log(user)

        if (!user) {
            done(null, false);
        } 
        //Checks if the password equals the hash. If it is it continues to the "else"-statement.
        else if (!user.validatePassword(pass)) {
            done(null, false);
        } else {
            done(null, user);
        }
      })
      .catch((err) => {
        done(err, false);
      }); 
};


const jwtCallback = (payload, done) => {
   
   console.log("PASSPORT jwtcallback")

   const cuid = payload.sub;
   
   User.findOne({cuid})
      .then((user) => {
         if (!user) {
            done(null, false);
         } else {
            done(null, user);
         }
      })
      .catch((err) => {
         done(err, false);
      });
};


const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  console.log("PASSPORT jwtlogin")

  User.findById(payload.sub, (err, user) => {
    if (err) { return done(err, false); }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
  
});

const localStrategy = new LocalStrategy(
   localOptions, localCallback
);

const jwtStrategy = new JwtStrategy(
   jwtOptions, jwtCallback
);

const jwtSessionStrategy = new JwtStrategy(
  jwtSessionOptions, jwtCallback
);

passport.use('local', localStrategy);
passport.use('jwt', jwtStrategy);
passport.use('jwt-session', jwtSessionStrategy)

export default passport;
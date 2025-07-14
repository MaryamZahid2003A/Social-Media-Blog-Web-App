import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/UserSchema.js";
import dotenv from 'dotenv';
dotenv.config();

passport.serializeUser((userId,done)=>{
    done(null,userId)
})

passport.deserializeUser(async(user,done)=>{
    try { 
        const ExistingUser = await User.findById(user.id);
        done(null,ExistingUser)
    }
    catch(error){
        done(error,null)
    }
})

passport.use(
    new GoogleStrategy({
        clientID:process.env.GOOGLE_CLIENT_ID,
        clientSecret:process.env.GOOGLE_CLIENT_SECRET,
        callbackURL:'http://localhost:5000/auth/google/callback'
    },
        async(accessToken,refreshToken,profile,done)=>{
            try{
                const existingUser = await User.findOne({googleId:profile.id});
                if (existingUser){
                    return done(null,existingUser)
                }
                const createUser = new User({
                    googleId:profile.id,
                    firstname:profile.name?.givenName ||  '',
                    lastname:profile.name?.familyName ||  '',
                    profession:'',
                    location:''
                })
                const newUser = await createUser.save();
                done(null,newUser)
            }
            catch(error){
                done(error,null)
            }
        }
    )
)
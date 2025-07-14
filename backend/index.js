import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import connectDb from './database/db.js';
import passport from 'passport';
import cookieSession from 'cookie-session';
import session from 'express-session'; 
import authRoutes from './routes/googleRoutes.js'; 
import './Server/passport.js';

dotenv.config();

const app = express();

connectDb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  session({
    secret: 'secret', 
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000, 
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(authRoutes);

app.get('/', async (req, res) => {
  console.log("Connected to Server");
  res.send("Server is running!");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

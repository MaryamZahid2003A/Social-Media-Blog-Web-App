import express from 'express';
import cookieParser from 'cookie-parser';
import connectDb from './database/db.js';
import passport from 'passport';
import cookieSession from 'cookie-session';
import session from 'express-session'; 
import authRoutes from './routes/googleRoutes.js'; 
import './Server/passport.js';
import UserRouter from './routes/userRoutes.js'
import FriendRoutes from './routes/friendRoutes.js'
import postRoute from './routes/postRoutes.js';
import cors from 'cors';
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';


dotenv.config();
const app = express();
connectDb();
app.use(cors({
  methods: ['POST', 'PUT', 'DELETE', 'GET', 'PATCH'],
  origin: 'http://localhost:5173',
  credentials: true 
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(authRoutes);
app.use('/api/user',UserRouter);
app.use('/api/friend',FriendRoutes);
app.use('/api/post',postRoute);


app.get('/', async (req, res) => {
  console.log("Connected to Server");
  res.send("Server is running!");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

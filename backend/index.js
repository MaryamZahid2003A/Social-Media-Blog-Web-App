import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import connectDb from './database/db.js';

dotenv.config();

const app = express();
const port = 3000;

connectDb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', async (req, res) => {
  console.log("Connected to Server");
  res.send("Server is running!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log("Connected to Mongo Db successfully !")

});

import mongoose from 'mongoose';

const connectDb = async () => {
  try {
    const conn = await mongoose.connect("mongodb+srv://maryamzahid960:BlogMedia2003@cluster0.8npmcou.mongodb.net/", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Connected to MongoDB 👍: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};
export default connectDb;

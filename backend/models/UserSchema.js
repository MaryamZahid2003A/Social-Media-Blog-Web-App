import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
    unique: true,
  },
  firstname: {
    type: String,  
    required: false,
  },
  lastname: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required:false,
  },
  profession:{
    type:String,
    requied:false,
  },
  location:{
    type:String,
    required:false,
  }
});

const User = mongoose.model('users', userSchema);
export default User;

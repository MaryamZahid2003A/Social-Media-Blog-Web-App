import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
  googleId: {type: String,required: false},
  firstname: {type: String,required: false},
  lastname: {type: String,required: false},
  email: {type: String,required: false},
  password: {type: String,required:false},
  profession:{type:String,requied:false},
  location:{ type:String,required:false},
  friends : [
    {
      type : Schema.Types.ObjectId,
      ref:"users"
    }
  ],
  views : [{type:String, required : false}],
  recievedRequest: [
    {
      email: { type: String, required: true },
      status: { type: Boolean, default: false } 
    }
  ],
  sentRequest: [
    {
      email: { type: String, required: true },
      status: { type: Boolean, default: false } 
    }
  ]
  
},{
  timestamps:true
});

const User = mongoose.model('User', userSchema);
export default User;

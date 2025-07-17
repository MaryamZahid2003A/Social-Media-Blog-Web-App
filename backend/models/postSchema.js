import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  description: {
    type: String,
    required: false,
  },
  media: [
    {
      url: { type: String, required: false },
      type: { type: String, enum: ['image', 'video', 'gif'], required: false },
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  comments :[{type : String , required :false}],
  likes : [{ type :String ,required : false}],
  user: { type: mongoose.Types.ObjectId, ref: 'User' }
});


export default mongoose.model('Post', postSchema);

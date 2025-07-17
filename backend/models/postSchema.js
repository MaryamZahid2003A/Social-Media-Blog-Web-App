import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  description: {
    type: String,
    required: false,
  },
  media: [
    {
      url: { type: String, required: true },
      type: { type: String, enum: ['image', 'video', 'gif'], required: true },
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


export default mongoose.model('Post', postSchema);

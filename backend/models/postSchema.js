import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  description: { type: String },
  media: [
    {
      url: { type: String },
      type: { type: String, enum: ['image', 'video', 'gif'] },
    }
  ],
  createdAt: { type: Date, default: Date.now },
  comments: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      text: { type: String, required: false },
      createdAt: { type: Date, default: Date.now }
    }
  ],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

export default mongoose.models.Post || mongoose.model('Post', postSchema);

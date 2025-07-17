import Post from "../models/postSchema.js";
import User from '../models/UserSchema.js'
export const uploadPost = async (req, res) => {
  try {
    const { description ,email } = req.body;
    console.log('FILES:', req.files);
    console.log('BODY:', req.body);

     const user = await User.findOne({ email });
    const tooLargeVideo = req.files.find(file =>
      file.mimetype.startsWith('video') && file.size > 50 * 1024 * 1024
    );

    if (tooLargeVideo) {
      return res.status(400).json({
        error: `Video "${tooLargeVideo.originalname}" exceeds the 50MB limit. Please upload a smaller file.`,
      });
    }

    const mediaFiles = req.files.map(file => ({
      url: file.path,
      type: file.mimetype.startsWith('image/gif') ? 'gif' :
            file.mimetype.startsWith('video') ? 'video' : 'image'
    }));

    const newPost = new Post({ user:user._id , description, media: mediaFiles });
    await newPost.save();

    res.status(200).json({ message: 'Post uploaded!', post: newPost });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

export const fetchPost = async (req, res) => {
  const { email } = req.params;
  try {
    const postData = await Post.find({ email });

    if (!postData || postData.length === 0) {
      return res.status(400).json({ message: "No Post Data Yet!" });
    }

    res.status(200).json({ message: "Posts Found", postData });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const fetchAllPost = async (req,res)=>{
  try{
    const fetchPost = await Post.find()
      .populate('user', 'firstname lastname profession') 
      .sort({ createdAt: -1 }); 
    if (!fetchPost){
      return res.status(400).json({message : "No Post Yet !"});
    }
    res.status(200).json({message : "Post uploaded !",fetchPost});
  }
  catch(error){
    console.log(error);
    return res.status(500).json({message : "Internal Server Error !"})
  }
}
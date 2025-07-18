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
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const postData = await Post.find({ user: user._id }) 
      .populate('user', 'firstname lastname profession') 
      .sort({ createdAt: -1 });

    if (!postData || postData.length === 0) {
      return res.status(404).json({ message: "No posts found for this user" });
    }

    res.status(200).json({ message: "Posts found", postData });

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
export const fetchAllComment = async (req, res) => {
  const { postid } = req.params;
  try {
    const post = await Post.findById(postid)
      .select('comments')
      .populate('comments.user', 'firstname lastname profession').sort({ createdAt: -1 });

    if (!post) {
      return res.status(400).json({ message: "Post not found!" });
    }

    console.log(JSON.stringify(post.comments, null, 2)); 

    res.status(200).json({
      message: "Comments fetched successfully!",
      comments: post.comments
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

export const Like = async(req,res)=>{
  
  const {postid , email , like }= req.body;
  try{
    const post = await Post.findOne({_id:postid});
    if (!post){
      return res.status(400).json({message : "Post Not Found !"});
    }
    const user = await User.findOne({ email });
    if (!user){
      return res.status(400).json({message : "User not found !"})
    }
    if (like){
      if (!post.likes.includes(user._id)){
        post.likes.push(user._id);
      }
    }
    else {
      post.likes = post.likes.filter((id) => id.toString() !== user._id.toString());
    }
    await post.save();
     return res.status(200).json({ message: 'Post updated', likes: post.likes });
  }
  catch(error){
    console.log(error);
    return res.status(500).json("Internal Server Error")
  }
}

export const postComment = async (req,res)=>{
   const {postid , email , coment}= req.body;
  try{
    const post = await Post.findOne({_id:postid});
    if (!post){
      return res.status(400).json({message : "Post Not Found !"});
    }
    console.log(post);
    const user = await User.findOne({ email });
    if (!user){
      return req.status(400).json({message : "User not found !"})
    }
    post.comments.push({ user: user._id, text:coment });
    
    await post.save();
     return res.status(200).json({ message: 'Comment Added', comments: post.comments });
  }
  catch(error){
    console.log(error);
    return res.status(500).json("Internal Server Error")
  }
}
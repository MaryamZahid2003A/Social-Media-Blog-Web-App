import Post from "../models/postSchema.js";
export const uploadPost = async (req, res) => {
  try {
    const { description } = req.body;
    console.log('FILES:', req.files);
    console.log('BODY:', req.body);

    // Check if any video file exceeds 50MB
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

    const newPost = new Post({ description, media: mediaFiles });
    await newPost.save();

    res.status(200).json({ message: 'Post uploaded!', post: newPost });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

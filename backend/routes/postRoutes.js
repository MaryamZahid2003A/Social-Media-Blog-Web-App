import { Router } from "express";
import {uploadPost,fetchPost,fetchAllPost , Like, postComment,fetchAllComment} from '../controllers/postController.js';
import { storage } from "../utilis/cloudinary.js";
import multer from "multer";

const router = Router();
const upload = multer ({storage});

router.post('/createPost',upload.array('media'),uploadPost);
router.get('/fetchPost/:email',fetchPost);
router.get('/fetchAllPost',fetchAllPost);
router.post('/like',Like);
router.post('/comment',postComment);
router.get('/AllComment/:postid',fetchAllComment);
export default router;
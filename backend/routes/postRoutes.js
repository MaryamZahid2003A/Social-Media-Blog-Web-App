import { Router } from "express";
import {uploadPost,fetchPost,fetchAllPost} from '../controllers/postController.js';
import { storage } from "../utilis/cloudinary.js";
import multer from "multer";

const router = Router();
const upload = multer ({storage});

router.post('/createPost',upload.array('media'),uploadPost);
router.get('/fetchPost/:email',fetchPost);
router.get('/fetchAllPost',fetchAllPost);
export default router;
import { Router } from "express";
import {uploadPost} from '../controllers/postController.js';
import { storage } from "../utilis/cloudinary.js";
import multer from "multer";

const router = Router();
const upload = multer ({storage});

router.post('/createPost',upload.array('media'),uploadPost);
export default router;
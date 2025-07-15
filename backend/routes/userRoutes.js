import { application, Router } from "express";
import {register,login,logout,EditProfile} from '../controllers/UserControllers.js';
import { verifyToken } from "../middleware/JwtAuthentication.js";
const router= Router();
router.post('/signup',register);
router.post('/login',login);
router.get('/logout',logout)
router.get('/blogPage',verifyToken,(req,res)=>{
    res.json({message : "You are allowed to use this route"})
})
router.get('/protected', verifyToken);
router.post('/editProfile',EditProfile)
export default router;
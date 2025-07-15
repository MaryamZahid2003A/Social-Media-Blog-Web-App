import { application, Router } from "express";
import {register,login,logout,EditProfile,fetchUser} from '../controllers/UserControllers.js';
import { verifyToken } from "../middleware/JwtAuthentication.js";
const router= Router();
router.post('/signup',register);
router.post('/login',login);
router.get('/logout',logout)
router.get('/blogPage',verifyToken,(req,res)=>{
    res.json({message : "You are allowed to use this route"})
})
router.get('/protected', verifyToken, (req, res) => {
  res.status(200).json({ user: req.user }); 
});
router.post('/editProfile',EditProfile);
router.get('/fetchUser/:email', fetchUser);
export default router;
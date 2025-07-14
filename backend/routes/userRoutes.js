import { application, Router } from "express";
import {register,login,logout} from '../controllers/UserControllers.js';
import { verifyToken } from "../middleware/JwtAuthentication.js";
const router= Router();
router.post('/signup',register);
router.post('/login/:email',login);
router.get('/logout',logout)
router.get('/protectedRoute',verifyToken,(req,res)=>{
    res.json({message : "You are allowed to use this route"})
})
export default router;
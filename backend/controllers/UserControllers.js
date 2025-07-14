import express from 'express';
import User from '../models/UserSchema.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const login=async(req,res)=>{
    const {email}=req.params;
    const {password}=req.body;
    try{
        const user = await User.findOne({email});
        if (!user){
            return res.status(400).json({message : "User Doesnot Exist ! "});
        }
        const checkPassword= await bcrypt.compare(password,user.password)
        if (!checkPassword){
             return res.status(400).json({message : "Incorrect Password !"}, user);    
        }
        const token = await jwt.sign({id:user.googleId},process.env.JWT_SECRET_KEY,{expiresIn : '20m'});
        res.cookie('AuthToken',token,{
            httpOnly : true,
            sameSite:'strict',
            maxAge:" 20 * 60 * 1000"
        })
        res.status(200).json({message : "Login Successfully !"})
    }
    catch(error){
        console.log(error)
        return res.status(500).json({message:"Internal Server Error "})
    }
}

export const register=async(req,res)=>{
    const {id,firstname,lastname,email,password,location,profession} = req.body;
    try{
        const registerUser= await User.findOne({email});
        if (registerUser){
            return res.status(400).json({message : " User Already Exist !"});
        }
        const hashedPassword = await bcrypt.hash(password,10);
        console.log(id);
        const user = new User({
            googleId:id,
            firstname,
            lastname,
            email,
            password:hashedPassword,
            profession,
            location
        })
        const savedUser = await user.save();
        const token = await jwt.sign({id:user.googleId},process.env.JWT_SECRET_KEY,{expiresIn : '30s'});
        res.cookie('AuthToken',token,{
            httpOnly : true,
            sameSite:'strict',
            maxAge: 30* 1000
        })
        res.status(201).json({message : "User Registered Successfully !",savedUser})
    }
    catch(error){
        console.log(error)
        return res.status(500).json({message : "Internal Server Error !"})
    }
}

export const logout = (req, res) => {
  res.clearCookie('AuthToken', {
    httpOnly: true,
    sameSite: 'strict',
  });
  res.status(200).json({ message: 'User logged out successfully!' });
};
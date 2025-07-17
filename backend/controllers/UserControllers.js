import express from 'express';
import User from '../models/UserSchema.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const login=async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user = await User.findOne({email});
        if (!user){
            return res.status(400).json({message : "User Doesnot Exist ! "});
        }
        const checkPassword= await bcrypt.compare(password,user.password)
        if (!checkPassword){
             return res.status(400).json({message : "Incorrect Password !"}, user);    
        }
        const token = await jwt.sign({user},process.env.JWT_SECRET_KEY,{expiresIn : '20m'});
        res.cookie('AuthToken',token,{
            httpOnly : true,
            sameSite:'strict',
            maxAge:60*60*1000
        })
        res.status(200).json({message : "Login Successfully !"} , user)
    }
    catch(error){
        console.log(error)
        return res.status(500).json({message:"Internal Server Error "})
    }
}

export const register = async (req, res) => {
  const { id, firstname, lastname, email, password, location, profession } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format!" });
  }

  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      message:
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.",
    });
  }

  try {
    const registerUser = await User.findOne({ email });
    if (registerUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      googleId: id,
      firstname,
      lastname,
      email,
      password: hashedPassword,
      profession,
      location,
    });

    const savedUser = await user.save();

    

    res.status(201).json({ message: "User Registered Successfully!", savedUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};



export const EditProfile = async (req,res)=>{
    const {email,firstname,lastname,profession,location}=req.body;
    try{
        const editProfile = await User.findOne({email});
        if (!editProfile){
            return res.status(400).json("User Not Found !");
        }
        editProfile.firstname = firstname || editProfile.firstname;
        editProfile.lastname = lastname || editProfile.lastname;
        editProfile.profession = profession || editProfile.profession;
        editProfile.location = location || editProfile.location;

        await editProfile.save();
        res.status(200).json({message : "Updated Successfully !", editProfile});
    }
    catch(error){
        console.log(error);
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

export const fetchUser= async (req,res)=>{
  const {email}=req.params;
  try{
    const user = await User.findOne({email});
    if (!user){
      return res.status(400).json({message : " User Not Found !"});
      
    }
    res.status(200).json({message : "User Data found" , user});
  }
  catch(error){
    console.log(error);
    return res.status(500).json({message : " Internal Server Error !"})
  }
}
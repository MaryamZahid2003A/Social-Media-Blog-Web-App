import express from 'express';
import User from '../models/UserSchema.js';
export const readFriend=async(req,res)=>{
    const searchQuery=req.query.name;
    try{
        const friends = await User.find({
            $or : [
                {firstname : {$regex:searchQuery , $options: 'i'}},
                {lastname : {$regex:searchQuery , $options:'i'}}
            ]
        }).select('firstname lastname email')
        if (!friends){
            return res.status(400).json({messsage : "No Matching Result !"})
        }
        res.status(200).json({friends});
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message : "Internal Server Error !"})
    }
}
export const sendRequest = async (req, res) => {
  const { RequestEmail, currentEmail, firstname, lastname } = req.body;

  try {
    const sender = await User.findOne({ email: currentEmail });
    if (!sender) {
      return res.status(404).json({ message: "Sender not found!" });
    }

    const duplicateRequest = sender.sentRequest.find((request) => request.email === RequestEmail);
    if (duplicateRequest) {
      return res.status(400).json({
        message: `You already sent a friend request to ${firstname} ${lastname}.`
      });
    }
    sender.sentRequest.push({
      email: RequestEmail,
      status: false
    });
    await sender.save();

    const receiver = await User.findOne({ email: RequestEmail });
    if (!receiver) {
      return res.status(404).json({ message: "Receiver not found!" });
    }

    const duplicateReceived = receiver.recievedRequest.find(
      (request) => request.email === currentEmail
    );
    if (!duplicateReceived) {
      receiver.recievedRequest.push({
        email: currentEmail,
        status: false
      });
      await receiver.save();
    }

    return res.status(200).json({
      message: `Friend request sent to ${firstname} ${lastname}!`,
      FriendList: sender
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const acceptRequest = async (req, res) => {
  const { email } = req.params;
  const { recieverEmail } = req.body; 
  try {
    // Request Accept User
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const request = user.recievedRequest.find(
      (r) => r.email === recieverEmail
    );
    if (!request) {
      return res.status(404).json({ message: 'Friend request not found' });
    }
    request.status = true;
    await user.save(); 

    // Request Sent User 
    const RequestSentUser = await User.findOne({email:recieverEmail});
    if (!RequestSentUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    const reqSent = RequestSentUser.sentRequest.find(
      (r) => r.email === email
    );
    if (!reqSent) {
      return res.status(404).json({ message: 'Friend request not found' });
    }
    reqSent.status = true;
    await RequestSentUser.save(); 
    return res.status(200).json({ message: 'Friend request accepted' });
  } catch (error) {
    console.error(error);
    return res.status(500).json('Internal Server Error');
  }
};


export const DenyRequest = async(req,res)=>{
   const { email } = req.params;
  const { receiverEmail } = req.body; 
  try {
    // Login User (Deny request)
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
   
     user.recievedRequest = user.recievedRequest.filter(
      (req) => req.email !== receiverEmail
    );
    await user.save(); 

    // Change the status of requestSent (who send the request?)
    const RequestSentUser = await User.findOne({email:receiverEmail});
    if (!RequestSentUser) {
      return res.status(400).json({ message: 'User not found' });
    }
    RequestSentUser.sentRequest = RequestSentUser.sentRequest.filter(
      (req) => req.email !== email
    );
    await RequestSentUser.save(); 
    return res.status(200).json({ message: 'Request Denied and Removed !' });
  } 
  catch(error){
    console.error(error);
    return res.status(500).json('Internal Server Error');
  }
}

export const ReceivedRequest = async(req,res)=>{
    const {email}=req.params;
    try{
        const recieved = await User.findOne({email});
        const filteredlist = recieved.recievedRequest.filter((user)=>user.status===true);
        if (filteredlist.length === 0) {
            return res.status(200).json({ message: "No accepted friend requests yet.", filteredlist: [] });
            }
        if (!recieved){
            return res.status(400).json("No One In Friend Request")
        }
        return res.status(200).json({filteredlist});
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message : "Internal Server Error !"})
    }
}

export const pendingRequest = async(req,res)=>{
    const {email}=req.params;
    try{
        const recieved = await User.findOne({email});
        const filteredlist = recieved.recievedRequest.filter((user)=>user.status===false);
        if (filteredlist.length === 0) {
            return res.status(200).json({ message: "No pending friend requests yet.", filteredlist: [] });
            }
        if (!recieved){
            return res.status(400).json("No One In Friend Request")
        }
        return res.status(200).json({filteredlist});
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message : "Internal Server Error !"})
    }
}



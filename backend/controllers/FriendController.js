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

    // Check if request already sent
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

    // Push to recipient's receivedRequest
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

export const AcceptRequest = async(req,res)=>{
    const {email} =req.body;
    try{
        const user = await User.findOne({email});
    }
    catch(error){
        console.log(error);
        return res.status(500).json("Internal Server Error")
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
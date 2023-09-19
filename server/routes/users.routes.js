const express = require('express');
const router = express.Router();

//utils

const {signup,login,changePassword,updateProfilePicture,updateContactDetails,findUserByPhoneNumber} =require('../utils/users.utils');

router.post('/signup',async(req,res)=>{
  const user=req.body;
  try{
    const savedUser=await signup(user);
    res.status(201).json({message:"signup successful",user:savedUser});
  }catch(error){
    res.status(500).json({ error: 'Failed to create user account' });
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await login(email, password);
    res.status(200).json({message:"login successful",user});
  } catch (error) {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

router.post('/:id/change-password', async (req, res) => {
  try {
    const userId = req.params.id;
    const {currentPassword, newPassword } = req.body
    const updatedUser = await changePassword(
      userId,
      currentPassword,
      newPassword,
    )
    res.status(200).json({message:"Password Changed",user:updatedUser});
  } catch (error) {
    res.status(401).json({ error: 'Invalid credentials' })
  }
})

router.post('/:id/update-profile-picture', async (req, res) => {
  try {
    const userId = req.params.id;
    const {newProfilePictureUrl } = req.body
    const updatedUser = await updateProfilePicture(userId,newProfilePictureUrl)
    res.status(200).json({message:"Profile picture changed",user:updatedUser})
  } catch (error) {
    res.status(404).json({ error: 'User not found' })
  }
})

router.post('/:id/update-contact-details',async(req,res)=>{
  try{
    const userId = req.params.id;
    const updatedContactDetails = req.body
    const updatedUser = await updateContactDetails(userId,updatedContactDetails);
    res.status(200).json({message:"Contact details updated",user:updatedUser});
  }catch(error){
    res.status(404).json({ error: 'User not found' })
  }
})

router.get('/phone/:phone_number',async(req,res)=>{
  try{
    const {phone_number}=req.params;
    const user=await findUserByPhoneNumber(Number(phone_number));
    if(user){
      res.status(200).json({message:"User found",user});
    }else{
      res.status(404).json({error:"User not found"});
    }
  }catch(error){
    res.status(500).json({ error: 'Failed to fetch user' })
  }
})

module.exports=router;
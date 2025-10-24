const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { signToken } = require("../utils/jwt");

exports.register = async (req,res)=>{
  const {username,password} = req.body;
  const hashed = await bcrypt.hash(password,10);
  const user = new User({username,password:hashed});
  await user.save();
  res.json({message:"User registered"});
};

exports.login = async (req,res)=>{
  const {username,password} = req.body;
  const user = await User.findOne({username});
  if(!user) return res.status(400).json({error:"User not found"});
  const match = await bcrypt.compare(password,user.password);
  if(!match) return res.status(400).json({error:"Invalid password"});
  const token = signToken(user._id);
  res.json({token});
};

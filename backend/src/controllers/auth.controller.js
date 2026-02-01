const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const { generateToken } = require('../utils/jwt');
const AppError = require('../errors/AppError');
const crypto = require('crypto');

const register = async (req, res, next) => {
  try {
    const { fullname, username, email, password, phone } = req.body;

    if (!fullname || !username || !email || !password || !phone) {
      return next(new AppError('All fields are required', 400));
    }

    const existingUser = await User.findOne({ $or: [ { email }, { phone } ] });
    if (existingUser) {
        return next(new AppError('User with this email or phone already exists', 409));
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ fullname, username, email, password: hashedPassword, phone });
    const token = generateToken({id:user.id});
    res.status(201).json({ message: 'User registered successfully', token });
  } catch (err) {
    next(err);
  }
}

const login=async(req,res,next)=>{
        const{email,password}=req.body;
        const user=await User.findOne({email});
        if(!user){
            return next(new AppError('Invalid email or password', 401));
        }
        const isPasswordValid=await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            return next(new AppError('Invalid email or password', 401));
        }
        const token=generateToken({id:user.id});
        res.json({message:'Login successful',token});
}


const resetPassword = async (req, res, next) => {
  try {
    const { email, password, confirmPassword } = req.body;

    if (!email || !password || !confirmPassword) {
      return next(new AppError("All fields are required", 400));
    }

    if (password !== confirmPassword) {
      return next(new AppError("Passwords do not match", 400));
    }

    const user = await User.findOne({ email });
    if (!user) {
      return next(new AppError("User with this email does not exist", 404));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    await user.save();

    res.json({
      message: "Password reset successful",
    });
  } catch (err) {
    next(err);
  }
};

const getUserProfile = async (req, res, next) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return next(new AppError("Unauthorized", 401));
    }

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return next(new AppError("User not found", 404));
    }

    res.json({
      user,
    });
  } catch (err) {
    next(err);
  }
};

module.exports={register,login,resetPassword,getUserProfile};
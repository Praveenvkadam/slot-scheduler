const z=require("zod");

const registerSchema=z.object({
    fullname:z.string().min(3,{message:"Fullname must be at least 3 characters long"}),
    username:z.string().min(3,{message:"Username must be at least 3 characters long"}),
    email:z.string().email({message:"Invalid email address"}),
    password:z.string().min(6,{message:"Password must be at least 6 characters long"}),
    phone:z.string().min(10,{message:"Phone number must be at least 10 digits long"})
});

const loginSchema=z.object({
    email:z.string().email({message:"Invalid email address"}),
    password:z.string().min(6,{message:"Password must be at least 6 characters long"})
});

module.exports={registerSchema,loginSchema};
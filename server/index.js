import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import User from "./models/User.js";


const app=express()
 app.use(express.json())


 // ---mongodb connected ----


const connectMongodb = async () => {
    const response = await mongoose.connect(process.env.MONGODB_URI)
    
    if (response) {
        console.log("mongodb  added successfully")
    }
}   
connectMongodb()


 

// --------- api -----------

app.post('/api/users',async(req,res)=>{

    const { first_name , last_name , email , phone_no , address , password }=req.body
    const newuser=new User({ first_name, last_name,email,phone_no,address,password})
     try{
        const saveduser=await newuser.save()
     return res.json({
        success:true, 
        data:saveduser,
        message:"user saved successfully"
    })
    }
   catch(error){
    return res.json({
        success:false,
        message:error.message
    })

    }

})

app.post("/api/login",async(req,res)=>{
    const {email, password}=req.body
     if(!email &&  !password){
       return res.json({
            success:false,
            message:"please enter email and password"
        })
    }
  
     const logineduser= await User.findOne({email:email, password:password})

     if(!logineduser){
       return res.json({
            success:false,
            message:"Invalid credential"
        })
     }

    return res.json({
        success:true,
        data:logineduser,
        message:"user login successfully"

     })
      



})


// --------server is listning-----------
const PORT=process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log(`server is running in port ${PORT}`)
 
})
import express from "express";
import jwt from "jsonwebtoken";
import {genPassword,addUser,passwordStrength,getUser,comparePassword} from '../actions/userActions.js';
const router=express.Router();

router.route('/signup')
    .post(async (request,response)=>{
      const {username,password,userType}=request.body;
      const user=await getUser(username);
      const passStrength=passwordStrength(password);
      if(user){
          response.status(400).send('Duplicate value!!');
      }
      else if(passStrength==='Password weak!!'){
        response.status(400).send(passStrength);
    }
    else{
      const hashedPassword=await genPassword(password);
      const result=await addUser({username,password:hashedPassword,userType});
      response.send(result);
    }
  });

  router.route('/signin')
        .post(async (request,response)=>{
    const {username,password}=request.body;
    const user=await getUser(username);
    if(!user){
      response.status(401).send('Invalid credentials');
      return;
    }
    const passValid=await comparePassword(password,user.password);
    if(!passValid){
      response.status(401).send('Invalid credentials');
      return;
    }
    if(user.userType==='Admin'){
      token=jwt.sign({id:user._id},process.env.ADMIN_SECRET_KEY);
      }
      if(user.userType==='Regular'){
      token=jwt.sign({id:user._id},process.env.REG_SECRET_KEY);
      }
      response.send({msg:'Sign in successful',id:user._id,token});
    });

 export const usersRouter=router;
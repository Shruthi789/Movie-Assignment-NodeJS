import express from "express";
import jwt from "jsonwebtoken";
import {genPassword,addUser,passwordStrength,getUser,comparePassword} from '../actions/userActions.js';
const router=express.Router();

router.route('/signup')
    .post(async (request,response)=>{
      const {username,password,usertype}=request.body;
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
      const result=await addUser({username,password:hashedPassword,usertype});
      response.send(result);
    }
  });

  router.route('/signin')
        .post(async (request,response)=>{
    const {username,password}=request.body;
    const user=await getUser(username);
    let token;
    if(!user){
      response.status(401).send('Invalid credentials');
      return;
    }
    const passValid=await comparePassword(password,user.password);
    if(!passValid){
      response.status(401).send('Invalid credentials');
      return;
    }
    if(user.usertype==='Admin'){
      token=jwt.sign({id:user._id},process.env.ADMIN_SECRET_KEY);
      }
      if(user.usertype==='Regular'){
      token=jwt.sign({id:user._id},process.env.REG_SECRET_KEY);
      }
      response.send({msg:'Sign in successful',type:user.usertype,token});
    });

 export const usersRouter=router;
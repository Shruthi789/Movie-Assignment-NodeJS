import express from "express"
import {genPassword,addUser,getUsers,passwordStrength} from '../userActions.js';
const router=express.Router();

router.route('/signup')
    .post(async (request,response)=>{
  const {username,password}=request.body;
  const users= await getUsers();
  const passStr=passwordStrength(password);
  if(users.find((value)=>value.username===username)){
    response.send('Duplicate Value!! Please enter a unique value');
  }
  else if(passStr==='Password weak!!'){
    response.send(passStr);
  }
  else{
  const hashedPassword=await genPassword(password);
  const result=await addUser({username,password:hashedPassword});
  response.send(`${passStr} ${JSON.stringify(result)}`);
  }
  });

 export const usersRouter=router;
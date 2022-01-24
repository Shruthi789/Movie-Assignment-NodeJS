import bcrypt from 'bcrypt';
import { client } from './index.js';

async function genPassword(password)
{
  const salt=await bcrypt.genSalt(10);
  console.log(salt);
  const hashedPassword=await bcrypt.hash(password,salt);
  console.log(hashedPassword);
  return hashedPassword;
}

function addUser(user){
    return client.db('newDB').collection('users').insertOne(user);
}

function getUsers(){
    return client.db('newDB').collection('users').find().toArray();
}

function passwordStrength(password){
    const condition1=password.length>=10 && password.search(/('@'|'!'|'#'|'$'|'%'|'^'|'&'|'*')/g)!==null;
    const condition2=password.search(/[A-Z]/g)!==null && password.search(/[0-9]/g)!==null;
    if(condition1 && condition2)
    {
        return 'Password Strong!!'
    }
    return 'Password weak!!'
}
export {genPassword,addUser,getUsers,passwordStrength}

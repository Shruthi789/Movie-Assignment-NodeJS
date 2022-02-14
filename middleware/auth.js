import jwt from "jsonwebtoken";
function adminAuth(request,response,next){
    try{
    const token=request.header('x-auth-token');
    jwt.verify(token,process.env.ADMIN_SECRET_KEY);
    next();
    }catch(error){
      response.status(401).send(error.message);
    }

}
function regAuth(request,response,next){
  try{
  const token=request.header('x-auth-token');
  const {role}=request.body;
  if(role==='Admin'){
    jwt.verify(token,process.env.ADMIN_SECRET_KEY);
  }
  else{
  jwt.verify(token,process.env.REG_SECRET_KEY);
  }
  next();
  }catch(error){
    response.status(401).send(error.message);
  }

}

export {adminAuth,regAuth};
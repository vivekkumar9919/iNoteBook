var jwt = require('jsonwebtoken');

const JWT_SECRET=process.env.secretKey;

const fetchuser = (req,res,next)=>{
    //  get the user from jwt token and add id to req object
    const token=req.header('auth-token');
    if(!token){
        res.status(401).send({error:"please authenticate using a valid token"});
    }
    try{
        const data =jwt.verify(token, JWT_SECRET);
        req.user=data.id;
        // console.log("inside the fetch ",data.user)
        next();
    }
    catch (error){
        res.status(401).send({error:"please authenticate using a valid token"});
    }
}

module.exports =fetchuser;
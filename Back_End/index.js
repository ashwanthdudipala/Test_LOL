import express from 'express';
import cors from 'cors'; 
import supabase from './DataBase/supabase.js';
import encrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const app = express();
app.use(cors());
app.use(express.json());

const secret_key = "reallylongstring";

const homePage = async(req,res)=>{
  res.status(201).json({
    success: true, message: "Token Valid"
  })
}

const gethomePage = async(req,res)=>{
  res.status(201).json({
    success: true, message: "Token Valid", data: req.body
  })
}

const login = async (req,res)=>{
  const{password:password} = req.body;
  const {email:email} = req.body;
  const update1 = await supabase.from('users').select('*', { count: 'exact', distinct: true }).eq('email',email);
  if(!update1.data[0]){
    return res.status(201).json({msg:`no member with that email`,success:`false`});
  }
  const compared = await encrypt.compare(password,update1.data[0].password);
  if(compared){
    const token = jwt.sign(
      {email:email},
      secret_key,
      {expiresIn:"10m"}
    );
    res.status(201).json({success : "true",token:token});
  }
  else{
    res.status(201).json({msg :`not correct password`,success:`false`});
  }
}

const register = async (req,res)=>{
  const{password:password} = req.body;
  const {email:email,lastName:lastName,firstName:firstName} = req.body;
  const hashed = await encrypt.hash(password,10);
  const update1 = await supabase.from('users').select('email', { count: 1, distinct: true }).eq('email',email);
  console.log(update1.length);
  if(update1.data.length == 0){
    console.log(update1);
    const create = await supabase.from('users').insert({email:email,password:hashed,lname:lastName,fname:firstName});
    res.status(201).json({success:"true"});
  }
  else{
    res.status(201).json({
      success:"false",
      msg: "already an account exists with that email"
      })
  }
}

const auth = async (req,res,next)=>{
  console.log(req);
  const authheader = req.headers["authorization"];
  const token = authheader && authheader.split(" ")[1];
  if(!token) return res.status(401).json({success:false, message: "No Token"});
  jwt.verify(token,secret_key,(err,user)=>{
    if(err){
      return res.status(403).json({
      success:false,message:"Invalid Token"
    })
    }
    next();
  })
}

app.get('/api/home',auth,homePage);
app.post('/api/home',auth,gethomePage);
app.post('/api/login',login);
app.post('/api/register',register);

const port = parseInt(process.env.PORT) || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

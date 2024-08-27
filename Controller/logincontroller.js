const Usermodel = require("../Models/Usermodel")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {sendmail}=require('../Config/mail')

module.exports.createUser = async (req,res)=>{

   try {

    const {name,email,username}=req.body;

    if(!name || !email || !username) return res.status(400).json({
     error: 'Please fill all the fields'
 
    })

     const uname = await Usermodel.findOne({username});
     if(uname) return res.status(400).json({
        error: 'User already exists with this email'
        })
     const mail = await Usermodel.findOne({email});
     if(mail) return res.status(400).json({
        error: 'User already exists with this email'
        })

        let password=generatePass();

        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt, async function(err, hash) {
                
                const newUser= await Usermodel.create({
                    name,email,username,password:hash
                   })
                
                   if (!newUser) return res.status(400).json({
                    error: 'Something went wrong User Not Creted'
                   })
                   const templatedata={
                    username,
                    password
                   }

                   sendmail(email,"Activate your account",templatedata)
               
                   sendCookie(res,newUser,"User create Successfully");
            });
        });
 
  
 
  } catch (err) {
        res.status(500).json({
            error: err.message,
            message:"error"
        })
  }


}


module.exports.loginUser = async (req,res)=>{

    try {
 
     const {username,password} =req.body;
 
     if(!username || !password) return res.status(400).json({
      error: 'Please fill all the fields'
  
     })
 
      const find = await Usermodel.findOne({username});

      // console.log(password);
      
      // console.log(find.password);
      

      bcrypt.compare(password, find.password, function(err, result) {
        
        // login and give jwt token
       
        
        if(!result) return res.status(500).json({
            error: 'Wrong Credintial'
        
           })

           sendCookie(res,find,"User login Successfully");

        
            //jwt token

    });
   
  
   } catch (err) {
         res.status(500).json({
             error: err.message,
             message:"error"
         })
   }
 
 
 }
 

 const sendCookie=(res,user,message)=>{

  
    const token=jwt.sign({id:user._id},process.env.SCREATE_KEY)
   

    res.cookie("token",token,{httpOnly:true}).status(200).json({
      message:message,
      user:user,
      token:token,
    })
  }

  module.exports.logout=async(req,res)=>{

    try {

      console.log(req.cookies);
      
      if(!req.cookies.token){
       return res.status(200).json({
          message:"You are not logged in",
          
        })
    }
  
    res.clearCookie("token")
    res.status(200).json({
      message:"User Logout sucessfully"
    })
      
    } catch (error) {
      res.status(500).json({
        error: error.message,
        message:"internal server error"
      })
    }
    }

    const generatePass= ()=> {
        let pass = '';
        let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$';
        for (let i = 1; i <= 8; i++) {
            let char = Math.floor(Math.random() * str.length + 1);
            pass += str.charAt(char);
        }

        console.log(pass);
        
        return pass;
    }
    
    
    
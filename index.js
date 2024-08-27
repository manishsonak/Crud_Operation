const express = require('express')
const app=express();
require('dotenv').config({path:"./Config/config.env"})
const connection=require('./connections/connection')
const cors = require('cors');
const {createUser, loginUser, logout}=require('./Controller/logincontroller')
const cookieParser = require('cookie-parser');
const { createPost, userPost, DeletePost, EditPost } = require('./Controller/PostController');
const { isAuthanticate } = require('./Middlewares/isAuthantication');



app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({extended:true}))


const corsOptions = {
    origin: ['http://localhost:5173', 'https://authncrud.netlify.app/'], // Your frontend origin
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true, // Allow cookies to be sent and received
  };
  
  app.use(cors(corsOptions));

app.get('/',(req,res)=>{
    res.send('Hello World')
})

app.post('/create',createUser)
app.post('/login',loginUser)
app.get('/logout',logout)


app.post('/createpost',isAuthanticate,createPost)
app.get('/user/posts',isAuthanticate,userPost)
app.delete('/post/delete/:id',isAuthanticate,DeletePost)
app.put('/post/edit/:id',isAuthanticate,EditPost)





connection();



app.listen(process.env.PORT || 4000,()=>{
    console.log('Server is running on port ',process.env.PORT);
})

















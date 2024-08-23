const mongoose=require('mongoose');


const UserSchema=mongoose.Schema({
    name:{
        type:String,

    },
    username:{
        type:String,
        require:true,
        unique:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    }
})

module.exports=mongoose.model('user',UserSchema);
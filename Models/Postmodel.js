const mongoose=require('mongoose');


const PostSchema=mongoose.Schema({
    title:{
        type:String,
        minlength: 3

    },
    description:{
        type:String,
        minlength: 5,
        maxlength: 225
    },
    isDeleted: {
        type: Boolean,
        default: false
    },

    userId:
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        },

    date:{
        type:Date,
        default:Date.now()
    }
    
   
   
})

module.exports=mongoose.model('post',PostSchema);
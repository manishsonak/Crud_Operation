const mongoose=require('mongoose')


const mongoConnection=()=>{
    mongoose.connect(process.env.MONGO_URL,{
        dbName:"CrudOperation"
    }).then(()=>{
        console.log("Connected to MongoDB")
    }).catch((err)=>{
        console.log(err)
    })
}

module.exports=mongoConnection;
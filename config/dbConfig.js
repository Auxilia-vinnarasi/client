const mongoose=require("mongoose");

const connectDB=async()=>{
    mongoose.connect(process.env.mongo_url,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(()=>console.log("Mongodb connected successfully"))
    .catch(()=>console.log("Mongodb not connected"))
}

module.exports=connectDB;
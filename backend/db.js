
const mongoose=require('mongoose');
const dotenv=require('dotenv');

// const mongoURI="mongodb://127.0.0.1:27017/iNotebook_database"
dotenv.config();

mongoose.set("strictQuery", false);
const connectToMongo = ()=>{
    mongoose.connect(process.env.DB_URL,{useNewUrlParser:true, useUnifiedTopology:true})
    .then(()=>{
        console.log("Database Connected")
    })
    .catch((error)=>{
        console.log(error);
    })
}

module.exports=connectToMongo;


const mongoose = require('mongoose');

require('dotenv').config();
const MONGO_URL = process.env.MONGO_URL;
console.log("MONGO_URL:", MONGO_URL);
const url = MONGO_URL;
module.exports.connect =()=>{
    mongoose.connect(url,{
  
    }).then(()=>{
        console.log("mongoDb connected")
    }).catch((error)=>console.log(error));
} 




const express = require('express');
const cors = require('cors')
const app = express();
const nodemailer = require('nodemailer');
const path = require('path')
const bodyParser = require('body-parser');
const db = require('./db');
const cookieParser = require('cookie-parser');
const User = require("./routes/User");
require('dotenv').config();
const TRANSPORTER_PASSWORD = process.env.TRANSPORTER_PASSWORD;
db.connect()
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
// app.use(cors());
app.use(cors({
    origin: 'http://localhost:3000', // Update with your frontend URL
    credentials: true,
  }));
app.use(bodyParser.json({limit:"50mb"}))
app.use(bodyParser.urlencoded({extended:true,limit:"50mb"}))
app.use((req,res,next)=>{
    req.header("Accesss-Control-Allow-Origin","*")
    req.header("Accesss-Control-Allow-Headers","*")
    next()
})



app.use("/api", User);

app.post('/contact',(req,res)=>{
 
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'engryashikaverma@gmail.com',
          pass: TRANSPORTER_PASSWORD
        }
    });
 
    const mailOptions = {
        from: req.body.to,// sender address
        to: ['engryashikaverma@gmail.com', 'parvsoni2003@gmail.com '] , // list of receivers
        name:req.body.name,
        number: req.body.number, 
        subject:"Contact Form",
        text:req.body.description,
        html: `
        <div style="padding:10px; border-style: ridge">
        <p>You have a new contact request.</p>
        <h3>Contact Details</h3>
        <ul>
            <li>Name: ${req.body.name}</li>
            <li>Email: ${req.body.to}</li>
            <li>Contact Number: ${req.body.number}</li>
            <li>Message: ${req.body.description}</li>
        </ul>
        </div>
        `
    };
     
    transporter.sendMail(mailOptions, function(error, info){
        if (error)
        {
          res.json({status: true, respMesg: 'ERROR!'})
        } 
        else
        {
          res.json({status: true, respMesg: 'Email Sent Successfully'})
        }
     
      });
});
const server = app.listen(process.env.PORT || 80,()=>{
    server.timeout = 30000;
    console.log("server connected to port")
})

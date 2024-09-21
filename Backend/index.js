const express=require('express')
const mongoose=require('mongoose')
const {connectToMongoDB}=require("./db/connectToMongoDB");
const { configDotenv } = require('dotenv');
const authRoutes=require('./routes/authRoutes')
const charityRoutes=require('./routes/charityRoutes')
const dotenv=require('dotenv')
dotenv.config();
const PORT = process.env.PORT || 5000;

const app=express();




app.use(express.json());

const router=express.Router();
app.use('/charity',charityRoutes)

app.use('/auth', authRoutes)

app.get('/',(req,res)=>{
    res.send("Hello world")
})




app.listen(PORT,"0.0.0.0",() => {
    connectToMongoDB();
    console.log(`listening on http://localhost:${PORT}`);
})
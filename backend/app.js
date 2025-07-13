import express from "express";
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000

app.get('/api/goals', (req, res)=>{
    res.status(200).json({message: 'Get Goals!!'})
})


app.listen(port, ()=>{
    console.log(`App running on port ${port}`);
})
import express from "express";
import dotenv from 'dotenv';
import goalsRoutes from './routes/goalsRoutes.js'

dotenv.config();

const app = express();
const port = process.env.PORT || 4000

app.use('/api/goals', goalsRoutes)


app.listen(port, ()=>{
    console.log(`App running on port ${port}`);
})
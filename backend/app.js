import express from "express";
import dotenv from 'dotenv';
import colors from 'colors'
import goalsRoutes from './routes/goalsRoutes.js'
import errorHandler from "./middlewares/errorMiddleware.js";
import connectDB from "./config/db.js";
import usersRoutes from './routes/usersRoutes.js'

dotenv.config();

connectDB();

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/goals', goalsRoutes)
app.use('/api/users', usersRoutes)

app.use(errorHandler);

app.listen(port, ()=>{
    console.log(`App running on port ${port}`);
})
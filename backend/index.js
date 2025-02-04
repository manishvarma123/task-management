import express from 'express';
import path from 'path'
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './db/connectDB.js';
import userRoute from './routes/user.route.js';
import taskRoute from './routes/task.route.js';

const app = express();

// app.use('/media', express.static(path.join(__dirname, 'media')));
app.use("/media", express.static("media"));

app.get('/', (req,res)=>{
    res.send('Welcome to backend')
})

app.use(cors({
    origin: ['http://localhost:5173','https://manish-task-management.netlify.app'],
    credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser());

app.use('/api/v1/user',userRoute);
app.use('/api/v1/task',taskRoute);

const port = process.env.PORT || 8000;

connectDB()
    .then(()=>{
        app.listen(port, ()=>{
            console.log(`Server is listening on port - ${port}`)
        })
    })
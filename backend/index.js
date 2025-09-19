const express=require('express');
const {connectMongoDB}=require('./connection')
const staticRouter=require('./Routes/staticRoutes')
const questionRouter=require('./Routes/questions')
const cors=require('cors')
const cookieParser=require('cookie-parser')
const {loggedInOnly}=require('./middlewares/user')

connectMongoDB('mongodb://127.0.0.1:27017/LearningApp')
.then(()=>{
    console.log('MongoDB connected');
})
.catch((err)=>{
    console.log(err);
})

const app=express();
const PORT=8000;

app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use(cors());
app.use(cookieParser());

app.use('/api',staticRouter);
app.use('/api/questions',loggedInOnly,questionRouter);


app.listen(PORT,()=>{
    console.log(`Server started at Port ${PORT}`);
})

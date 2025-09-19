const express=require('express');
const {connectMongoDB}=require('./connection')
const staticRouter=require('./Routes/staticRoutes')
const questionRouter=require('./Routes/questions')
const cors=require('cors')
const cookieParser=require('cookie-parser')
const {loggedInOnly}=require('./middlewares/user')
const dotenv=require('dotenv')

dotenv.config()

connectMongoDB(process.env.MONGO_URI)
.then(()=>{
    console.log('MongoDB connected');
})
.catch((err)=>{
    console.log(err);
})

const app=express();
const PORT=process.env.PORT || 8000;

app.use(express.urlencoded({extended:false}));
app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173",          // Vite dev frontend
//   "https://your-frontend-domain.com" // deployed frontend
];

app.use(cors(
    {
    origin: allowedOrigins,
    credentials: true, // if using cookies/auth
  }
));
app.use(cookieParser());

app.use('/api',staticRouter);
app.use('/api/questions',loggedInOnly,questionRouter);


app.listen(PORT,()=>{
    console.log(`Server started at Port ${PORT}`);
})

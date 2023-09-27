const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config()
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRouter')
const quizRouter = require('./routes/quizRouter')
const questionRouter = require('./routes/questionRouter')
const quizUserAnswerRouter = require('./routes/quizUserAnswerRouter')


const app = express();
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['POST', 'GET', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));


//mongoDB connection using connection string
mongoose.connect(process.env.DATABASE_URL).then(() => {
    console.log('connected to data base!!')
}).catch(err => console.log(err))

app.use(express.json({
    limit: '10kb'
}))

app.get('/message', (req, res) => {
    res.status(200).json({
        message: 'This is the server-side'
    })
})
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Specify the exact origin
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     res.setHeader('Access-Control-Allow-Credentials', 'true');
//     res.setHeader('Access-Control-Expose-Headers', 'Content-Type, Authorization'); // Add this header
// console.log("used")
//     next();
// });
app.use('/api/v1/users', userRouter)
app.use('/api/v1/quizzes', quizRouter)
app.use('/api/v1/questions', questionRouter)
app.use('/api/v1/answer', quizUserAnswerRouter)
app.listen(8000, () => {
    console.log('successfully connected to the port succesfully')
})
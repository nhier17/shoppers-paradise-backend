require('dotenv').config();
require('express-async-errors');


const express = require('express')
const app = express();
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser');
//security packages 
const cors = require('cors')
const helmet = require('helmet')

const connectDB = require('./db/connect-db')
//error handler middleware
const notFound = require('./Middleware/not-found')
const errorHandlerMiddleware = require('./Middleware/error-handler')

//routes
const authRouter = require('./Routes/auth')
const productRouter = require('./Routes/Products')
const userRouter = require('./Routes/user')

app.use('/uploads',express.static('uploads'))
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(fileUpload())
app.use(cookieParser(process.env.JWT_SECRET))


app.get('/', (req, res) => {
    res.send('shoppers paradise')
})

//routes
app.use('/api/auth', authRouter)
app.use('/api/products', productRouter)
app.use('/api/users', userRouter)
//middleware
app.use(errorHandlerMiddleware)
app.use(notFound)


const port = process.env.PORT || 5000;

const start = async () => {
    try {
     await connectDB(process.env.MONGO_URI)   
app.listen(port, () => console.log(`server is listening on port ${port}...`))
    } catch (err) {
console.log(err)
    }
}
start();
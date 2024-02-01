require('dotenv').config();
require('express-async-errors');


const express = require('express')
const app = express();
//security packages 
const cors = require('cors')

const connectDB = require('./db/connect-db')
//error handler middleware
const notFound = require('./Middleware/not-found')
const errorHandlerMiddleware = require('./Middleware/error-handler')

//routes
const authRouter = require('./Routes/auth')
const productRouter = require('./Routes/Products')

app.use('/uploads',express.static('uploads'))
app.use(express.json())
app.use(cors())



app.get('/', (req, res) => {
    res.send('shoppers paradise')
})

//routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/products', productRouter)
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
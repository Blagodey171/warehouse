const cookieParser = require('cookie-parser')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const config = require('./config')
const session = require('express-session')
const MongoStore = require('connect-mongo')

const userRouter = require('./routes/userRouter')
require('dotenv').config()
const app = express();

async function start () {
    try {
        await mongoose.connect(process.env.MOBGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(process.env.PORT, () => {
            console.log('server starting')
        })
    } catch (e) {
        console.log(e)
    }
}
start()

app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin: true,
    credentials: true,
}))
app.use(
        session({
            store: MongoStore.create({
                mongoUrl: process.env.MOBGODB_URL,
                stringify: true
            }),
            secret: process.env.SECRET_KEY_SESSION,
            saveUninitialized: true,
            resave: false,
            cookie: {
                httpOnly: true,
                secure: false,
                maxAge: 10000,
                path: '/'
            },
            name: 'sessionWarehouse'
        })
)



app.use('/api', userRouter);
app.get('/', (req, res) => {
    res.send('home')
});



// const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const config = require('./config')

const session = require('express-session')
const MongoStore = require('connect-mongo')

const userRouter = require('./router/userRouter')

const app = express();
const PORT = config.PORT;

const Phone = require('./schema/PhoneModel')
const User = require('./schema/UserModel')

const secretKeySession = 'testingSession'

async function start () {
    try {
        await mongoose.connect('mongodb+srv://perelad797:Pereladdenis8980@warehouse-cluster.iya4c.mongodb.net/warehouse?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(PORT, () => {
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
                mongoUrl: 'mongodb+srv://perelad797:Pereladdenis8980@warehouse-cluster.iya4c.mongodb.net/warehouse?retryWrites=true&w=majority',
                stringify: true
            }),
            secret: secretKeySession,
            saveUninitialized: true,
            resave: false,
            cookie: {
                httpOnly: true,
                secure: false,
                maxAge: 100000,
                path: '/'
            },
            name: 'sessionWarehouse'
        })
)



app.use('/api', userRouter);
app.get('/', (req, res) => {
    res.send('home')
});
app.get('/test', (req, res) => {
    
});


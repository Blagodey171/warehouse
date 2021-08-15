const config = require('./config.js')
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cors = require('cors')
// const jsonParser = express.json()
// const bodyParser = require('body-parser')
const { check, validationResult } = require('express-validator')
const userRouter = require('./router/userRouter')

const app = express();
const PORT = config.PORT;

const Phone = require('./schema/PhoneModel')
const User = require('./schema/UserModel')


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

app.use(express.json());
app.use(cors())
app.use('/api', userRouter);
app.use('/api', userRouter);


app.get('/', (req, res) => {
    res.send('home')
});
app.get('/test', (req, res) => {
    res.json({
        name: 'adfs'
    })
});


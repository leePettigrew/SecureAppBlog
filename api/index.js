const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const User = require('./models/User');
var bcrypt = require('bcryptjs');
const app = express();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');


const salt = bcrypt.genSaltSync(10);
const secret = 'eiqwonoi21n34i09qdwjmisamewq';

app.use(cors({credentials:true,origin:'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());

mongoose.connect('mongodb+srv://leepettigrew:g70Esn0Einbd2ZbO@cluster0.bsynnkk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

app.post('/register', async (req,res) => {
    const {username,password} = req.body;
    try{
        const userDoc = await User.create({
             username,
             password:bcrypt.hashSync(password,salt),
            });
        res.json(userDoc);
    }
    catch{ 
    }
});


app.post('/login', async (req,res) => {
    const {username,password} = req.body;
    const userDoc = await User.findOne({username});
    const isPassGood = bcrypt.compareSync(password, userDoc.password);
    if(isPassGood){
        //logged in
        jwt.sign({username,id:userDoc._id}, secret, {}, (err,token) =>{
            if(err) throw err;
            res.cookie('token', token).json('ok');
        });
    }else{
        //not logged in.
        res.status(400).json('Incorrect Login');
    }
});

app.get('/profile', (req,res) => {
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, (err,info)=>{
        if(err) throw err;
        res.json(info);
    });
});


app.post('/logout', (req,res) => {
    res.cookie('token', '').json('ok');
})



app.listen(3500);


//mongodb+srv://leepettigrew:g70Esn0Einbd2ZbO@cluster0.bsynnkk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
//g70Esn0Einbd2ZbO
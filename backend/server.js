const express = require('express');
const bcrypt = require('bcryptjs');
const knex = require('knex');
const cors = require('cors');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const image = require('./controllers/image');
const profile = require('./controllers/profile');

const app = express();
const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: true
    }
});

app.use(express.json());
app.use(cors());

app.get('/', (req, res)=>{
    res.send('working');
});
app.post('/signin', (req,res)=>{signin.handleSignin(req,res,db,bcrypt)});
app.post('/register', (req,res)=>{register.handleRegister(req,res,db,bcrypt)});
app.get('/profile/:id', (req,res)=>{ profile.handleProfile(req,res,db)});
app.put('/image', (req,res)=>{image.handleImage(req,res,db)});
app.post('/imageurl', (req,res)=>{image.handleApiCall(req,res)});
app.listen(process.env.PORT || 3000, ()=>{
    console.log(`app is running on port ${process.env.PORT}`)
});

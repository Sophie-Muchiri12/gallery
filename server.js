const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const config = require('./_config.js')


// Define routes
let index = require('./routes/index');
let image = require('./routes/image');

// connecting the database

const env = process.env.NODE_ENV || 'development'

mongoose.connect(config.mongoURI[env],{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(() =>console.log("Connected to Mongo DB Atlas"))
.catch((err) =>console.log("Failed to connect", err.message))


// test if the database has connected successfully

let db = mongoose.connection
db.once('open', () =>{
    console.log("Database connected successfully")
})

db.on('error', (err) =>console.log('Database connection failed'))
// Initializing the app
const app = express();


// View Engine
app.set('view engine', 'ejs');

// Set up the public folder;
app.use(express.static(path.join(__dirname, 'public')));

// body parser middleware
app.use(express.json())


app.use('/', index);
app.use('/image', image);



 if (require.main === module){
const PORT = process.env.PORT || 5000;
app.listen(PORT,() =>{
    console.log(`Server is listening at http://localhost:${PORT}`)
});

 }

 module.exports = app
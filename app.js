const express = require("express");
const path = require("path");
const fs = require("fs");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance');
const app = express();
const bodyparser = require('body-parser');
const port = 80;

// Mongoose schema
var contactSchema = new mongoose.Schema({
    name : String,
    phone:String,
    address:String,
    email:String,
    concern:String
});

var Contact = mongoose.model('Contact',contactSchema);
// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{
    const params={};
    res.status(200).render('home.pug',params)
})
app.get('/about', (req, res)=>{
    const params={};
    res.status(200).render('about.pug',params)
})
app.get('/services', (req, res)=>{
    const params={};
    res.status(200).render('services.pug',params)
})
app.get('/contact', (req, res)=>{
    const params={};
    res.status(200).render('contact.pug',params)
})
app.get('/classes', (req, res)=>{
    const params={};
    res.status(200).render('classes.pug',params)
})
app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send('item has been saved to database')
    }).catch(()=>{
        res.status(400).send('item was not saved to database')
    })
    // res.status(200).render('contact.pug')
})

// START THE SERVER
app.listen(port,()=>{
    console.log(`started on port ${port}`);
})
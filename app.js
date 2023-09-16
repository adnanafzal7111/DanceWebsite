const express=require("express");
const path=require('path');
const fs=require('fs');
const app=express();

//Install body parser
const bodyparser=require('body-parser');
const port = 8000;
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/ContactDance');
}

//Define Schema
const ContactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String,
});
const Contact = mongoose.model('contact', ContactSchema);







//EXPRESS SPECIFIC STUFF
app.use('/static',express.static('static')); //For Static file Serving
app.use(express.urlencoded());//Helps us to get out data to expressnode


//PUG SPECIFIC STUFF
app.set('view engine', 'pug');//Set the template engine as pug
app.set('views',path.join(__dirname,'views'));//Set the views directory 


app.get('/',(req,res)=>{
    // const params={};
res.status(200).render('home');
})

app.get('/contact',(req,res)=>{
    const params={};
res.status(200).render('contact',params);
})
app.post('/contact',(req,res)=>{

    var myData=new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to database");
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database");
    })

    // res.status(200).render('contact');
})

app.listen(port,()=>{
    console.log(`The application stared successfully on port ${port}`);
})

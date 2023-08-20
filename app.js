const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const port = 80;

async function main(contact){
    console.log("connecting to mongoDB atlas...");
    await mongoose.connect('mongodb+srv://abhishek:abhishek@mydatabase.noc1szd.mongodb.net/DanceContacts')
    console.log("connnected.")
    console.log("Writing to the database.")
    await contact.save()
    console.log("saved to the database.")
}
const contactschema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
})
    
const Contact = mongoose.model('Contact', contactschema);

app.use(express.static('static')) //or 'public'
app.use(express.urlencoded())

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res)=>{
    res.status(200).render('home.pug')
})
app.get('/contact', (req, res)=>{
    res.status(200).render('contact.pug')
})
app.post('/contact', (req, res)=>{
    const myData = new Contact(req.body);
    console.log(myData)
    main(myData)
    res.status(200).render('contact.pug')
})



app.listen(port, ()=>{
    console.log(`The application started successfully on ${port}`)
})
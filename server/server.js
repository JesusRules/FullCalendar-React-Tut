require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const CalendarController = require('./controllers/CalendarController.js');

const app = express();
app.use(bodyParser.json());
app.use(cors()); // SOOOOO Important!!!!!!!!!!


//connect to MongoDB
const dbURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster30.byydrau.mongodb.net/${process.env.DB_DATABASE}?retryWrites=true&w=majority`;
mongoose.connect(dbURI, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
 }).then(() => {
     app.listen(5001, () => {
         console.log('Server is running on port 5001 and connected to MongoDB')
     })
 }).catch((error) => {
    console.log('Unable to connect to Server and/or MongoDB')
 });


app.use('/api/calendar', CalendarController);

app.get('/', (req, res) => {
    res.send('Server is running!')
})

// app.listen(5001, () => console.log('Server started at 5001'))
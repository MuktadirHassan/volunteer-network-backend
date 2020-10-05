const express = require('express');
require('dotenv/config');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Import Routes
const adminRoute = require('./routes/admin');
const volunteerRegistration = require('./routes/volunteerRegistration');
const events = require('./routes/allEvents');
const registeredEvents = require('./routes/registeredEvents');
const volunteers = require('./routes/volunteers');


// Connect to DB
require('dotenv/config');
mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true,useUnifiedTopology: true },
    () => console.log('DB connection established'),
);

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true})); 

// Route Middlewares
app.use('/admin', adminRoute);
app.use('/volunteerRegistration', volunteerRegistration);
app.use('/events', events);
app.use('/registeredEvents', registeredEvents);
app.use('/volunteers', volunteers);



app.listen(process.env.PORT || 8080,() => console.log('Server listening on port 8080'));

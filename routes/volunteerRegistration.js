const route = require('express').Router();
const verify = require('./auth');
const Volunteer = require('../models/RegisteredVolunteer');

route.post('/', verify ,async (req, res) => {
    const volunteer = new Volunteer({
        fullName: req.body.fullName,
        email: req.body.email,
        eventTitle: req.body.eventTitle,
        description: req.body.description,
        eventDate: req.body.eventDate,
    });
    try {
        const newVolunteer = await volunteer.save();
        res.send('Volunteer Registration successful');
    } catch (err) {
        res.send(err);
    }
})

module.exports = route;
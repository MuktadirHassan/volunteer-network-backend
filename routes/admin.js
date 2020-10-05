const router = require('express').Router();
const verify = require('./auth');
const Event = require('../models/Event');

router.get('/dashboard', async (req, res) => {
    res.send('Admin')
})

router.post('/addEvent', verify ,async (req, res) => {

    // Create a new event
    const event = new Event({
        eventTitle: req.body.eventTitle,
        eventDescription: req.body.eventDescription,
        eventDate: req.body.eventDate,
        eventBanner: req.body.eventBanner
    });
    try {
        const createEvent = await event.save();
        res.status(200).send('event created');
    } catch (err) {
        res.status(400).send(err);
        console.log(err);
    }

})
module.exports = router;
const router = require('express').Router();
const verify = require('./auth');
const RegisteredVolunteer = require('../models/RegisteredVolunteer');

router.get('/',verify, async (req, res) => {
    const volunteers = await RegisteredVolunteer.find();
    res.json(volunteers);
})

module.exports = router;
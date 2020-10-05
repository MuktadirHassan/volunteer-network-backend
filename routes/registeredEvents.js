const router = require('express').Router();
const admin = require('firebase-admin');
const serviceAccount = require('../volunteer-network.json');
const RegisteredEvents = require('../models/RegisteredVolunteer');

router.get('/', (req, res) => {
    const findRegisteredEvents = async (email) => {
        try{
            const registeredEvents = await RegisteredEvents.find({email:email}).exec();
            res.json(registeredEvents);
        } catch (err) {
            console.log('Something went wrong.')
            res.send(err)
        }
    }
    if(admin.apps.length === 0)
    {
        admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        database: process.env.FIRE_DB
    })};
    const authToken = req.header('authToken');
    if(!authToken) return res.sendStatus(401).send('Access denied');

    var email;
    // Verify Token
    admin.auth().verifyIdToken(authToken)
    .then( decodedToken => {
        email = decodedToken.email;
        findRegisteredEvents(email)
    })
    .catch(err => {res.send(err)});
    
   
    
})

module.exports = router;
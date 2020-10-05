module.exports = function (req, res, next) {
    const admin = require('firebase-admin');
    const serviceAccount = require('../volunteer-network.json');
    if(admin.apps.length === 0)
    {
        admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        database: process.env.FIRE_DB
    })};
    const authToken = req.header('authToken');
    if(!authToken) return res.status(401).send('Access denied');
    
    try {
        // Verify Token
        admin.auth().verifyIdToken(authToken)
        .then( decodedToken => {
            let email = decodedToken.email;
            return email;
        })
        .catch(err => console.log(err));
        next();
    } catch (err) {
        res.status(400).send('Invalid token');
    }
}

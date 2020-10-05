module.exports = function (req, res, next) {
    const admin = require('firebase-admin');
 
    if(admin.apps.length === 0)
    {
        admin.initializeApp({
        credential: admin.credential.cert({
            "private_key": process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
            "client_email": process.env.FIREBASE_CLIENT_EMAIL,
            "project_id": process.env.FIREBASE_PROJECT_ID
        }),
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

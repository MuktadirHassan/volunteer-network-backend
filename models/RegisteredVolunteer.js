const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
    fullName: { type: String , maxLength:32, required: true},
    email: { type: String, maxLength:64, required: true},
    eventTitle: { type: String , maxLength: 64, required: true},
    description: { type: String , maxLength: 256, required: true},
    eventDate: { type: Date , required: true, default: Date.now},
})

module.exports = mongoose.model('Volunteers',volunteerSchema);
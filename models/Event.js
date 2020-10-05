const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    eventTitle: { type: String , maxLength: 64, required: true},
    eventDescription: { type: String , maxLength: 256, required: true},
    eventDate: { type: Date , required: true, default: Date.now},
    eventBanner: { type:String, required: true}
})

module.exports = mongoose.model('Event',eventSchema);
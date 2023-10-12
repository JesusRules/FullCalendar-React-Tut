const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    title: { type: String, required: true }
})

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
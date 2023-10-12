const router = require('express').Router();
const Event = require('../models/Event.js');
const moment = require("moment");

router.post('/create-event', async (req, res) => {
    try {
        const { title, start, end } = req.body;
        // return res.send(req.body);
        const event = new Event({ title, start, end });
        await event.save();
        res.status(201).json({ message: "Event created successfully", newEvent: event});
    } catch (error) {
        res.status(400).json({ error: "There was an error creating an event!" })
    }
})

router.get('/get-events', async (req, res) => {
    const events = await Event.find({ 
        start: {$gte: moment(req.query.start).toDate()}, 
        end: {$lte: moment(req.query.end).toDate()}
    })
    res.send(events);
})

module.exports = router;
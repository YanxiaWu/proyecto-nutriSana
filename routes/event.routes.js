const express = require('express');
const router = express.Router();
const User = require('./../models/User.model')
const Event = require('../models/Event.model')
const { isLoggedIn } = require("../middleware/route-guard");

//create a new event
router.get("/events/create", isLoggedIn, (req, res, next) => {

    res.render('event/create-event')
});

router.post('/events/create', isLoggedIn, (req, res, next) => {

    const { title, type, description, latitude, longitude } = req.body

    const location = {
        type: 'Point',
        coordinates: [latitude, longitude]
    }

    Event
        .create({ title, type, description, location })
        .then(() => {
            res.redirect('/events')
        })
        .catch(error => { next(error) })
});

//List events

router.get('/events', (req, res, next) => {

    let isAdmin = req.session.currentUser ? req.session.currentUser.role === 'ADMIN' : false

    Event
        .find()

        .populate("participants")


        .then(event => {
            res.render('event/list', {
                event,
                isAdmin
            })
        })
        .catch(error => { next(error) })
})

// Update participants event

router.post('/events/:id/join', (req, res, next) => {

    const { id: event_id } = req.params
    const userId = req.session.currentUser._id

    Event
        .findByIdAndUpdate(event_id, { $addToSet: { participants: userId } })
        .then(event => {

            res.redirect("/events")
        })
        .catch(error => { next(error) })

});

// { $addToSet: { <field1>: <value1>, ... } }


// Update events
router.get('/events/:id/edit', (req, res, next) => {

    const { id: event_id } = req.params

    Event
        .findById(event_id)
        .then(event => {
            res.render('event/edit-event', event)
        })
        .catch(error => { next(error) })

});

router.post('/events/:id/edit', (req, res, next) => {

    const { title, type, description, latitude, longitude } = req.body
    const location = {
        type: 'Point',
        coordinates: [latitude, longitude]
    }
    const { id: event_id } = req.params

    Event
        .findByIdAndUpdate(event_id, { title, type, description, location })
        .then(() => res.redirect(`/events`))
        .catch(error => { next(error) })

});

// delete. delete usa con formulario con POST, o get con get sin formulario
router.get('/events/:id/delete', (req, res, next) => {

    const { id: event_id } = req.params

    Event
        .findByIdAndDelete(event_id)
        .then(() => res.redirect('/events'))
        .catch(error => { next(error) })
});








module.exports = router;
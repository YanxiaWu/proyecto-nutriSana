const express = require('express');
const router = express.Router();
const User = require('./../models/User.model')
const Event = require('../models/Event.model')
const { isLoggedIn } = require("../middleware/route-guard");


//create a new place
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
        .then(Event => {
            res.redirect('/events')
        })
        .catch(err => console.log(err))
});


//all events,solo ADMIN puede ver el button de editar y eliminar

router.get('/events', (req, res, next) => {
    let isAdmin
    if (req.session.currentUser) {
        isAdmin = req.session.currentUser.role === 'ADMIN'
    } else {
        isAdmin = false
    }
    Event
        .find()
        .then(event => {
            res.render('event/list', {
                event,
                isAdmin
            })
        })
        .catch(err => console.log(err))
})



// update o edit the event
router.get('/events/:id/edit', (req, res, next) => {
    const { id: event_id } = req.params
    Event
        .findById(event_id)
        .then(event => {
            console.log(event)
            res.render('event/edit-event', event)
        })
        .catch(err => console.log(err))

});


router.post('/events/:id/edit', (req, res, next) => {

    const { title, type, description, latitude, longitude } = req.body
    const location = {
        type: 'Point',
        coordinates: [latitude, longitude]
    }
    const coordinates = [latitude, longitude]
    const { id: event_id } = req.params

    Event
        .findByIdAndUpdate(event_id, { title, type, description, location })
        .then(() => res.redirect(`/events`))
        .catch(err => console.log(err))

});


// delete one place. delete usa con formulario con POST, o get con get sin formulario
router.get('/events/:id/delete', (req, res, next) => {
    const { id: event_id } = req.params

    Event
        .findByIdAndDelete(event_id)
        .then(() => res.redirect('/events'))
        .catch(err => console.log(err))

});






module.exports = router;

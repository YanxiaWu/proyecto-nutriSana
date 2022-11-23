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










//update o edit the place
// router.get('/palces/:id/edit', (req, res, next) => {
//     const { id: place_id } = req.params
//     Place
//         .findById(place_id)
//         .then(place => {
//             console.log(typeof place.location.coordinates)
//             res.render('place/edit-place', place)
//         })
//         .catch(err => console.log(err))

// });


// router.post('/palces/:id/edit', (req, res, next) => {

//     const { name, type } = req.body
//     const { id: place_id } = req.params
//     console.log(req.params)
//     Place
//         .findByIdAndUpdate(place_id, { name, type })
//         .then(() => res.redirect(`/palces`))
//         .catch(err => console.log(err))

// });


// delete one place. delete usa con formulario con POST, o get con get sin formulario
router.get('/events/:id/delete', (req, res, next) => {
    const { id: event_id } = req.params

    Place
        .findByIdAndDelete(event_id)
        .then(() => res.redirect('/events'))
        .catch(err => console.log(err))

});






module.exports = router;

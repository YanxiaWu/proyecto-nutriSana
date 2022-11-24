const express = require('express');
const router = express.Router();
const { isLoggedIn } = require("../middleware/route-guard");
const User = require('./../models/User.model')

// User list

router.get("/usuarios", isLoggedIn, (req, res, next) => {

    User
        .find()
        .select({ username: 1 })
        .then(users => {
            res.render('user/list', { users })
        })
        .catch(error => { next(error) })
})

// Profile

router.get('/usuarios/:id', isLoggedIn, (req, res) => {

    const { id } = req.params
    const isAdmin = req.session.currentUser.role === 'ADMIN'
    const isMY = req.session.currentUser._id === id

    User
        .findById(id)
        .then(user => {
            res.render('user/profile', { user, isAdmin, isMY })
        })
        .catch(error => { next(error) })
})


// Edit

router.get('/usuarios/:id/editar', isLoggedIn, (req, res, next) => {

    const { id: user_id } = req.params

    User
        .findById(user_id)
        .then(user => {
            res.render('user/edit-profile', user)
        })
        .catch(error => { next(error) })

});

router.post('/usuarios/:id/editar', isLoggedIn, (req, res, next) => {

    const { username, email, password } = req.body
    const { id: user_id } = req.params

    User
        .findByIdAndUpdate(user_id, { username, email, password })
        .then(() => res.redirect(`/usuarios/${user_id}`))
        .catch(error => { next(error) })

})

// Delete 
router.post('/usuarios/:id/eliminar', isLoggedIn, (req, res) => {

    const { id: user_id } = req.params

    User
        .findByIdAndDelete(user_id)
        .then(() => res.redirect('/usuarios'))
        .catch(error => { next(error) })
})

module.exports = router;

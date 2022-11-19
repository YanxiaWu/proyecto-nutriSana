const router = require("express").Router()
const bcrypt = require('bcryptjs')
const User = require("../models/User.model")
const saltRounds = 10
const { isLoggedOut } = require('../middleware/route-guard')
const { isLoggedIn } = require('../middleware/route-guard')

// Signup
router.get('/registrar', isLoggedOut, (req, res, next) => res.render('auth/signup'))
router.post('/registrar', isLoggedOut, (req, res, next) => {
    const { email, username, userPwd } = req.body;

    bcrypt
        .genSalt(saltRounds)
        .then(salt => bcrypt.hash(userPwd, salt))
        .then(hashedPassword => User.create({ ...req.body, password: hashedPassword }))
        .then(createdUser => res.redirect('/'))
        .catch(error => next(error))
})


// Login
router.get('/login', isLoggedOut, (req, res, next) => res.render('auth/login'))
router.post('/login', isLoggedOut, (req, res, next) => {

    const { email, password } = req.body
    console.log({ email, password })

    User
        .findOne({ email })
        .then(user => {
            if (!user) {
                res.render('auth/login', { errorMessage: 'Email no registrado en la Base de Datos' })
                return
            } else if (bcrypt.compareSync(password, user.password) === false) {
                res.render('auth/login', { errorMessage: 'La contraseña es incorrecta' })
                return
            } else {
                req.session.currentUser = user
                res.redirect('/')
            }
        })
        .catch(error => next(error))
})

//Logout    (mismo con eliminar, POST con formulario, GET con button directamente)
router.get('/logout', isLoggedIn, (req, res, next) => {
    req.session.destroy(() => res.redirect('/login'))
})


module.exports = router

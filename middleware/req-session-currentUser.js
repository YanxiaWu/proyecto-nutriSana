function reqSession(req, res, next) {

    console.log('----- ACCEDIENDO A MIDDLEWARE DE SESIÓN LOCAL ------')

    if (req.session.currentUser) {
        res.locals.loggedUser = req.session.currentUser._id
        res.locals.name = req.session.currentUser.username
    } else {
        res.locals.loggedUser = null
        res.locals.name = null
    }

    console.log('VALOR:', res.locals)

    next()
}

module.exports = {
    reqSession
}
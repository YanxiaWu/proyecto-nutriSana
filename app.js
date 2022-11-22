// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);
// Session config
require('./config/session.config')(app)


// Routes



// default value for title local
const capitalize = require("./utils/capitalize");
const projectName = "nutriSana";

app.locals.appTitle = `${capitalize(projectName)}`;


app.use((req, res, next) => {
    if (req.session.currentUser) {
        app.locals.loggedUser = req.session.currentUser._id
        app.locals.name = req.session.currentUser.username
    } else {
        app.locals.loggedUser = null
        app.locals.name = null
    }
    next()
})


// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./routes")(app)
require("./error-handling")(app);

module.exports = app;

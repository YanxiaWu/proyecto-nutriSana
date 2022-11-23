module.exports = (app) => {
    app.use("/", require("./index.routes"));
    app.use("/", require("./auth.routes"));
    app.use("/", require("./user.routes"));
    app.use("/", require("./recipe.routes"));
    // ciudado con el orden de los abajo
    app.use("/api", require("./api-map.routes"));
    app.use("/", require("./event.routes"));
};


module.exports = (app) => {
    app.use("/", require("./index.routes"));
    app.use("/", require("./auth.routes"));
    app.use("/", require("./user.routes"));
    app.use("/", require("./recipe.routes"));
};


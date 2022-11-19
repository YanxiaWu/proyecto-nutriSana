const { Schema, model } = require("mongoose");

const ingredientSchema = new Schema(
    {
        name: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const Ingredient = model("Ingredient", ingredientSchema);

module.exports = Ingredient;

//  cómo crear la base de datos de ingredientes.
//  1. crear a mano uno por uno
//   2. algun metodo para sembrar un documento a base de dato, de donde y como.

const { Schema, model } = require("mongoose");

const recipeSchema = new Schema(
    {
        ingredients: [
            {
                type: mongoose.Types.ObjectId,
                ref: "Ingredient",
            },
        ],
        quantity: {
            type: String,
        },

    },

    {
        timestamps: true
    }
);


const Recipe = model("Recipe ", recipeSchema);

module.exports = Recipe;

//cuando el usuario rellena el formulario, el usuario siempre pone un number de quantity,
// pero el API necesita un string,
// Así lo pide la API => {"ingr": ["10 g oil"] }
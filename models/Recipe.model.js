const { Schema, model } = require("mongoose");

const recipeSchema = new Schema(
    {
        ingredients:
            [
                {
                    ingredient: {
                        type: mongoose.Types.ObjectId,
                        ref: "Ingredient"
                    },
                    quantity: {
                        type: Number
                    },
                    unit: {
                        type: String
                    }
                }
            ],
        owner: {
            type: mongoose.Types.ObjectId,
            ref: "User"
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
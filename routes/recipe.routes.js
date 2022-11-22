const express = require('express');
const router = express.Router();

const nutritionApi = require("./../services/edamam-api.service");
const api = new nutritionApi();

// const Recipe = require('./../models/Recipe.model')




// New recipe form (render)
router.get("/recetas/crear", (req, res, next) => {
    res.render('recipe/crear-recipe')
})


// New recipe form (handle)
router.post("/recetas/crear", (req, res, next) => {
    const { recipe } = req.body
    let ingredientes = []

    console.log(recipe)
    let receta = {
        ingr: [recipe]
    }

    console.log(receta)
    let recipeJSON = JSON.stringify(receta)

    api
        .getRecipe(recipeJSON)
        .then(apiResponse => res.render('recipe/pintar-recipe', { result: apiResponse.data }))
        // .then(apiResponse => res.send(apiResponse.data))
        .catch(err => console.log(err))

})



module.exports = router;

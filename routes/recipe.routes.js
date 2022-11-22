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
// router.post("/recetas/crear", (req, res, next) => {
//     const { recipe } = req.body
//     let ingredientes = recipe.split(',');

//     console.log(ingredientes)

//     let receta = {
//         ingr: ingredientes
//     }

//     console.log(receta)
//     let recipeJSON = JSON.stringify(receta)

//     api
//         .getRecipe(recipeJSON)
//         .then(apiResponse => res.render('recipe/pintar-recipe', { result: apiResponse.data }))
//         .catch(err => console.log(err))

// })

//nuevos codigos sobre nuevo formulario
router.post("/recetas/crear", (req, res, next) => {
    const { ingredient1, quantity1, unit1, ingredient2, quantity2, unit2 } = req.body
    let element1 = `${quantity1}${unit1} ${ingredient1}`
    let element2 = `${quantity2}${unit2} ${ingredient2}`
    let totalElements = [element1, element2]
    let receta = {
        ingr: totalElements
    }

    console.log('hhhhhhhhhhhhhhhhh', receta)
    let recipeJSON = JSON.stringify(receta)

    api
        .getRecipe(recipeJSON)
        .then(apiResponse => res.render('recipe/pintar-recipe', { result: apiResponse.data }))
        .catch(err => console.log(err))

}
)


module.exports = router;

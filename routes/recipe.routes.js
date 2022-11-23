const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();
const Recipe = require('./../models/Recipe.model')
const nutritionApi = require("./../services/edamam-api.service");
const api = new nutritionApi();


// New recipe form (render)
router.get("/recetas/crear", (req, res, next) => {
    res.render('recipe/crear-recipe')
})




//nuevos codigos sobre nuevo formulario
router.post("/recetas/crear", (req, res, next) => {
    const { ingredient1, quantity1, unit1, ingredient2, quantity2, unit2 } = req.body

    let element1 = `${quantity1}${unit1} ${ingredient1}`
    let element2 = `${quantity2}${unit2} ${ingredient2}`
    let totalElements = [element1, element2]
    let receta = {
        ingr: totalElements
    }

    let recipeJSON = JSON.stringify(receta)

    api
        .getRecipe(recipeJSON)
        .then(apiResponse => {
            const { ingredients, calories } = apiResponse.data
            const composion = ingredients.map(ing => ing.text)
            const { CHOCDF, FAT, PROCNT } = apiResponse.data.totalNutrients

            Recipe
                .create({ ingredients: composion, calories, carbohydrate: CHOCDF.quantity, fat: FAT.quantity, protein: PROCNT.quantity })
                .then(recipe => {
                    res.redirect('/recetas')
                })
                .catch(err => console.log(err))

        })
        .catch(err => console.log(err))

}
)



//listado de recetas

router.get('/recetas', (req, res) => {
    let isAdmin
    if (req.session.currentUser) {
        isAdmin = req.session.currentUser.role === 'ADMIN'
    } else {
        isAdmin = false
    }
    Recipe
        .find()
        .then(recipes => {
            res.render('recipe/list', { recipes, isAdmin })
        })
        .catch(err => console.log(err))
})


//eliminar recetas
router.post('/recetas/:id/eliminar', (req, res, next) => {
    const { id: recipe_id } = req.params

    Recipe
        .findByIdAndDelete(recipe_id)
        .then(() => res.redirect(`/recetas`))
        .catch(err => console.log(err))

});





module.exports = router;

const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();
const Recipe = require('./../models/Recipe.model')
const nutritionApi = require("./../services/edamam-api.service");
const api = new nutritionApi();
const User = require('../models/User.model')
const { isLoggedIn } = require('./../middleware/route-guard')


// New recipe form (render)
router.get("/crear", isLoggedIn, (req, res, next) => {
    res.render('recipe/crear-recipe')
})


// New recipe post 
router.post("/crear", isLoggedIn, (req, res, next) => {

    const { ingredient1, quantity1, unit1, ingredient2, quantity2, unit2 } = req.body

    let element1 = `${quantity1}${unit1} ${ingredient1}`
    let element2 = `${quantity2}${unit2} ${ingredient2}`
    let receta = {
        ingr: [element1, element2]
    }

    let recipeJSON = JSON.stringify(receta)

    api
        .getRecipe(recipeJSON)
        .then(apiResponse => {

            const { ingredients, calories } = apiResponse.data
            const composion = ingredients.map(ing => ing.text)
            const { CHOCDF, FAT, PROCNT } = apiResponse.data.totalNutrients
            const { _id: owner } = req.session.currentUser

            return Recipe.create({ ingredients: composion, calories, carbohydrate: CHOCDF.quantity, fat: FAT.quantity, protein: PROCNT.quantity, owner })
        })
        .then(recipe => {
            res.redirect('/recetas')
        })
        .catch(error => { next(error) })
})

// My recipes list

router.get('/mis-recetas', isLoggedIn, (req, res) => {

    Recipe
        .find({ owner: req.session.currentUser._id })
        .then(recipes => {
            res.render('recipe/my-list', { recipes })
        })
        .catch(error => { next(error) })
})

// List recipe

router.get('/', isLoggedIn, (req, res) => {

    let isAdmin = req.session.currentUser ? req.session.currentUser.role === 'ADMIN' : false

    Recipe
        .find()
        .populate("owner")
        .then(recipes => {
            res.render('recipe/list', { recipes, isAdmin })
        })
        .catch(error => { next(error) })
})

// Delete recipe
router.post('/:id/eliminar', isLoggedIn, (req, res, next) => {

    const { id: recipe_id } = req.params

    Recipe
        .findByIdAndDelete(recipe_id)
        .then(() => res.redirect(`/recetas`))
        .catch(error => { next(error) })

});

module.exports = router;

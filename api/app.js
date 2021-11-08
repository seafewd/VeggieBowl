const express = require('express');
const multer = require('multer');

const app = express();
const port = 3000;

const { mongoose } = require('./db/mongoose');

// parse incoming requests with JSON payload
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// load in mongoose models
const { Recipe } = require('./db/models');

// CORS HEADERS MIDDLEWARE
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id");

    res.header(
        'Access-Control-Expose-Headers',
        'x-access-token, x-refresh-token'
    );

    next();
});

/* ROUTE HANDLERS */

/** GET /recipes */
app.get('/recipes', (req, res) => {
    // return array of all recipes in db
    Recipe.find({}).then((recipes) => {
        res.send(recipes);
    })
})

/** GET one recipe */
app.get('/recipes/:id', (req, res) => {
    // return array of all recipes in db
    Recipe.findOne({
        _id: req.params.id
    }).then((recipe) => {
        res.send(recipe);
    })
})

/* POST /recipes */
app.post('/recipes', (req, res) => {
    // create a new recipe and return the recipe document back to user (includes id)
    // recipe information (fields) will be passed in via the JSON request body
    let form = JSON.parse(req.body.form);
    console.log(form);

    let name = form.name;
    let description = form.description;
    let ingredients = form.ingredients;
    let instructions = form.instructions;
    let type = form.type;

    let newRecipe = new Recipe({
        name,
        description,
        ingredients,
        instructions,
        type
    });
    newRecipe.save().then((recipeDoc) => {
        // full recipe document is returned
        res.send(recipeDoc);
    })
})

app.patch('/recipes/:id', (req, res) => {
    // update the specified recipe (recipe document with id in the url)
    //with the new values specified in the JSON body of the request
    Recipe.findOneAndUpdate({ _id: req.params.id }, {
        $set: req.body
    }).then(() => {
        res.sendStatus(200);
    })
})

app.delete('/recipes/:id', (req, res) => {
    console.log("deleting recipe " + req.params.id)
    // delete the specified recipe
    Recipe.findOneAndRemove({
        _id: req.params.id,
    }).then((removedRecipeDoc) => {
        res.send(removedRecipeDoc)
    })
})

app.listen(port, () => {
    console.log(`VeggieBowl server is listening on port ${port}.`);
})
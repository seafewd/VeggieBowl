const express = require('express');
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

/* POST /recipes */
app.post('/recipes', (req, res) => {
    // create a new recipe and return the recipe document back to user (includes id)
    // recipe information (fields) will be passed in via the JSON request body
    let title = req.body.title;
    let description = req.body.description;
    //let ingredients = req.body.ingredients;
    let instructions = req.body.instructions;

    let newRecipe = new Recipe({
        title,
        description,
        //ingredients,
        instructions
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
    // delete the specified recipe
    Recipe.findOneAndRemove({
        _id: req.params.id
    }).then((removedRecipeDoc) => {
        res.send(removedRecipeDoc)
    })
})

app.listen(port, () => {
    console.log('VeggieBowl server is listening on port ' + port);
})
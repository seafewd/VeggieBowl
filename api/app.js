const express = require('express');

const app = express();
const port = 3000;

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/images");
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
})

const upload = multer({ storage });

const cors = require('cors');
const corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200
};

const { mongoose } = require('./db/mongoose');

// load in mongoose models
const { Recipe } = require('./db/models');

// parse incoming requests with JSON payload
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));  
app.use('/uploads/images', express.static('uploads/images'));


app.use(cors(corsOptions));


// // CORS HEADERS MIDDLEWARE
// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id");
//     res.header('Access-Control-Expose-Headers', 'x-access-token, x-refresh-token');
//     next();
// });


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
    console.log("recipe created: " + form);

    let name = form.name;
    let description = form.description;
    let ingredients = form.ingredients;
    let instructions = form.instructions;
    let type = form.type;
    let published = form.published;
    let images = form.images;

    let newRecipe = new Recipe({
        name,
        description,
        ingredients,
        instructions,
        type,
        published,
        images
    });
    newRecipe.save().then((recipeDoc) => {
        // full recipe document is returned
        res.send(recipeDoc);
    })
})

/**
 * POST single image upload
 */
app.post('/file', upload.single('file'), (req, res) => {
    const file = req.file;
    if (file) {
        res.json(file);
    }
    else {
        throw new Error("Failed to upload")
    }
})

/**
 * POST multiple image upload
 */
app.post('/files', upload.array('images'), (req, res) => {
    const files = req.files;
    console.log(files)
    if (Array.isArray(files) && files.length > 0)
        res.json(files);
    else
        throw new Error("Failed to upload")
})

app.patch('/recipes/:id', (req, res) => {
    // update the specified recipe (recipe document with id in the url)
    // with the new values specified in the JSON body of the request
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
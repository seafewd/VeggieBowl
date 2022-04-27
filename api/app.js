const express = require('express');

const app = express();

const dotenv = require('dotenv');
dotenv.config();

//const port = 3000;
const port = process.env.PORT || 8080; // for heroku

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/images");
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
})

// const module = require('path');
// app.use(express.static('public'));
//   app.get('*',(req,res)=>{
//     res.sendFile(path.join(__dirname,'public/index.html'));
// })

// load in jwt
const jwt = require('jsonwebtoken');

const upload = multer({ storage });

const { mongoose } = require('./db/mongoose');

// load in mongoose models
const { Recipe } = require('./db/models');
const { User } = require('./db/models/user.model');
const { Ingredient } = require('./db/models/ingredient.model');

// parse incoming requests with JSON payload
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));  
app.use('/uploads/images', express.static('uploads/images'));



/* Middleware */

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


app.listen(port, () => {
    console.log(`VeggieBowl server is listening on port ${port}.`);
});


// check whether the request has a valid JWT access token
let authenticate = (req, res, next) => {
    let token = req.header('x-access-token');
    // verify the jwt
    jwt.verify(token, User.getJWTSecret(), (err, decoded) => {
        if (err) {
            // jwt is invalid, do not authenticate
            res.status(401).send(err);
        } else {
            // jwt is valid
            req.user_id = decoded._id;
            next();
        }
    });
}

// verify refresh token middleware (which will be verifying the session)
let verifySession = (req, res, next) => {
    // grab refresh token from request header
    let refreshToken = req.header('x-refresh-token');
    // grab id from request header
    let _id = req.header('_id');
    User.findByIdAndToken(_id, refreshToken).then((user) => {
        if (!user) {
            // user not found
            return Promise.reject({
                'error': 'User not found. Make sure that the refresh token and user ID are correct.'
            });
        }

        // user found - refresh token exists in db, but we still have to check if it has expired or not
        req.user_id = user._id;
        req.userObject = user;
        req.refreshToken = refreshToken;

        let isSessionValid = false;

        user.sessions.forEach((session) => {
            if (session.token === refreshToken) {
                // check if the session has expired
                if (User.hasRefreshTokenExpired(session.expiresAt) === false) {
                    // refresh token hasnt expired
                    isSessionValid = true;
                }
            }
        });
        if (isSessionValid) {
            // the session is valid, call next() tocontinue with processing this web request
            next();
        } else {
            // session not valid
            return Promise.reject({
                'error': 'Refresh token has expired or the session is invalid.'
            })
        }
    }).catch((e) => {
        res.status(401).send(e);
    })
}


/* ROUTE HANDLERS */

/** Recipes Routes **/

/** GET /recipes */
app.get('/recipes', (req, res) => {
    // return array of all recipes in db
    Recipe.find({}).then((recipes) => {
        res.send(recipes);
    })
})

/** GET one recipe */
app.get('/recipes/:id', (req, res) => {
    // find and return a recipe from ID
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

    let name = form.name;
    let description = form.description;
    let ingredients = form.ingredients;
    let instructions = form.instructions;
    let type = form.type;
    let published = form.published;
    let images = form.images;
    let tags = form.tags;

    let newRecipe = new Recipe({
        name,
        description,
        ingredients,
        instructions,
        type,
        images,
        published,
        tags
    });
    newRecipe.save().then((recipeDoc) => {
        // full recipe document is returned
        res.send(recipeDoc);
    })
})

/**
 * Ingredients routes
 */

// GET
// app.get('/ingredients', async (req, res) => {
//     const payload = req.body.payload;
//     let search = await Ingredient.find({name: {$regex: new RegExp('^' + payload + '.*', 'i')}}).exec();
//     console.log("backend payload GET:")
//     console.log(search)
//     search = search.slice(0, 10);
//     res.send({ payload: search });
// })

// POST
app.post('/ingredients', async (req, res) => {
    const payload = req.body.payload;
    let search = await Ingredient.find({name: {$regex: new RegExp('^' + payload + '.*', 'i')}}).exec();
    search = search.slice(0, 10);
    console.log(search)
    res.send({ payload: search });
})

/** Image Routes */

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
    if (Array.isArray(files) && files.length > 0) {
        res.json(files);
    }
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


/* USER ROUTES */ 

/**
 * POST /users
 * Purpose: Sign up
 */
app.post('/users', (req, res) => {
    // user sign up
    let body = req.body;
    let newUser = new User(body);
    newUser.save().then(() => {
        return newUser.createSession();
    }).then((refreshToken) => {
        // session created, refresh token returned
        // now generate an access token for the user
        return newUser.generateAccessAuthToken().then((accessToken) => {
            // access auth token generated successfully, now return an object contianing the auth tokens
            return { accessToken, refreshToken }
        });
    }).then((authTokens) => {
        // now construct and send the response to the user with their auth tokens in the header and the user object in the body
        res
            .header('x-refresh-token', authTokens.refreshToken)
            .header('x-access-token', authTokens.accessToken)
            .send(newUser);
    }).catch((e) => {
        res.status(400).send(e);
    })
})

/**
 * POST /users/login
 * Purpose: Login
 */
app.post('/users/login', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    User.findByCredentials(email, password).then((user) => {
        return user.createSession().then((refreshToken) => {
            // session created successfully, refreshtoken returned
            // now generate access auth token for the user
            return user.generateAccessAuthToken().then((accessToken) => {
                // access auth token generated successfully, now return an object containing the auth tokens
                return { accessToken, refreshToken }
            });
        }).then((authTokens) => {
            // construct and send the response to the user with their auth tokens in the header and the user ob ject inthe body
            res
                .header('x-refresh-token', authTokens.refreshToken)
                .header('x-access-token', authTokens.accessToken)
                .send(user);
        });
    }).catch((e) => {
        res.status(400).send(e);
    })
})

/**
 * GET /users/me/access-token
 * Purpose: generates and returns an access token
 */
app.get('/users/me/access-token', verifySession, (req, res) => {
    // we know that the user/caller is authenticated and we have the user_id available to us
    req.userObject.generateAccessAuthToken().then((accessToken) => {
        res.header('x-access-token', accessToken).send({ accessToken });
    }).catch((e) => {
        res.status(400).send(e);
    })
})
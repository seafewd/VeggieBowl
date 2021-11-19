const mongoose = require('mongoose');
const { Ingredient } = require('./ingredient.model');

const RecipeSchema = ({
    name: {
        type: String,
        required: false,
        minlength: 1,
        trim: true
    },
    description: {
        type: String,
        required: false,
        trim: true
    },
    ingredients: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ingredient',
        required: false
    }],
    instructions: [{
    }],
    type: {
        type: String,
        required: false
    },
    images: [{
        type: String,
        trim: true
    }],
    published: {
        type: Boolean
    }
})

const Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = { Recipe };
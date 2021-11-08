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
    instructions: {
        type: String,
        required: false,
        trim: true
    },
    type: {
        type: String,
        required: false
    }
})

const Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = { Recipe };
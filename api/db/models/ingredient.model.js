const mongoose = require('mongoose');

const IngredientSchema = ({
    name: {
        type: String
    },
    quantity: {
        type: Number,
        unit: {
            type: String
        }
    }
})

const Ingredient = mongoose.model('Ingredient', IngredientSchema);

module.exports = { Ingredient };
const mongoose = require('mongoose');

const IngredientSchema = ({
    ingName: {
        type: String
    },
    ingQuantity: {
        type: Number
    },
    ingQuantityUnit: {
        type: String
    },
    ingImgUrl: {
        type: String
    }
})

const Ingredient = mongoose.model('Ingredient', IngredientSchema);

module.exports = { Ingredient };
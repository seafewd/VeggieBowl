const mongoose = require('mongoose');
require('./ingredient.model');

const schemaOptions = {
    timestamps: true
}

const RecipeSchema = mongoose.Schema (
    {
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
        // ingredients: [{
        //     _id: {
        //         type: mongoose.Schema.Types.ObjectId,
        //         ref: 'Ingredient'
        //     },
        //     ingName: String,
        //     ingQuantity: String, // todo change?
        //     ingQuantityUnit: String,
        //     ingImgUrl: String
        // }],
        //
        // KEEP THIS v
        // ingredients: [mongoose.model('Ingredient').schema],
        instructions: [{
            // why does this work like it do???? todo
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
        },
        tags: [{

        }],
        createdAt: Date,
        updatedAt: Date
    }, schemaOptions
);

const Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = { Recipe };
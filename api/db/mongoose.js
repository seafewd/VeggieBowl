/* This file will handle connection logic to the mongodb database */

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/veggiebowl', { useNewUrlParser: true }).then(() => {
    console.log('Connected to MongoDB successfully!');
}).catch((e) => {
    console.log('Error while attempting to connect to MongoDB');
    console.log(e);
});

module.exports = {
    mongoose
}
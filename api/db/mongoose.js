/* This file will handle connection logic to the mongodb database */

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
// mongoose.connect(process.env.DATABASE, { useNewUrlParser: true }).then(() => {
mongoose.connect("mongodb+srv://admin:521983d1ce99a69c7d5804c4f3ffc09b4b9441c5039e9b157c8ca0462031b47e@veggiebowl.aut2y.mongodb.net/veggiebowl", { useNewUrlParser: true }).then(() => {
    console.log('Connected to VeggieBowl DB successfully!');
}).catch((e) => {
    console.log('Error while attempting to connect to VeggieBowl DB');
    console.log(e);
});

module.exports = {
    mongoose
}
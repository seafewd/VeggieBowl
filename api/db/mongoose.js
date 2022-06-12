/* This file will handle connection logic to the mongodb database */

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true }).then(() => {
    console.log('Connected to VeggieBowl DB successfully!');
}).catch((e) => {
    console.log('Error while attempting to connect to VeggieBowl DB');
    console.log(e);
});

module.exports = {
    mongoose
}
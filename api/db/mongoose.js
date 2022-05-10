/* This file will handle connection logic to the mongodb database */

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE_LOCAL, { useNewUrlParser: true }).then(() => {
<<<<<<< HEAD
    console.log('Connected to VeggieBowl DB successfully!');
=======
    console.log('Connected to MongoDB successfully!');
>>>>>>> dyndep
}).catch((e) => {
    console.log('Error while attempting to connect to VeggieBowl DB');
    console.log(e);
});

module.exports = {
    mongoose
}
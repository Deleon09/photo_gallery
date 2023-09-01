const mongoose = require('mongoose');

const dbConnection = async() => {

    try {

        await mongoose.connect(process.env.MONGODB_URI);
        console.log('DB online');

    } catch(err) {
        console.log(err);
        throw new Error('Error connecting to database');
    }

}

module.exports = {
    dbConnection
}
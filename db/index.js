const mongoose = require('mongoose');
const config = require('config');

const db = config.get('mongoURI');

const connectDB = async () => {
    try {
        await mongoose.connect(db, { 
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log('DB Connected ...');
    } catch (error) {
        console.error(error.message);

        // Exit process with failure
        process.exit();
    }
}

module.exports = connectDB;
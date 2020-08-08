const mongoose = require('mongoose');
const { connectionString } = require('../config/config.json');

connectDB = async ()=>{
    try {
        await mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Database connected . . .');
    } catch(e){
        console.log('Error in database connection.', e);
    }
    
}

module.exports = connectDB;
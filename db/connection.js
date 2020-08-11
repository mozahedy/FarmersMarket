const mongoose = require('mongoose');
const { connectionString } = require('../config/config.json');

connectDB = async ()=>{
    try {
        await mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true });
    } catch(e){
    }
    
}

module.exports = connectDB;
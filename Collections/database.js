'use strict'

class Database{
    constructor(){
        this.mongoose = require('mongoose');
    }

    //connection to database giving the url
    connectDB(url){
     this.mongoose.connect(url).then( () => {
         console.log('database connected');
     });  
    }

    //getting model of the database 
    getSchema(Schema, name){
        const s =  new this.mongoose.Schema(Schema);
        return this.mongoose.model(name,s);
    }
}

module.exports = new Database();
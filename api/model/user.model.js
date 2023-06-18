var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = new Schema({
    name:{
        type:String,
        require: true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true,
    }
});
var Model = mongoose.model('User', User);
module.exports = Model;


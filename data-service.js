const mongoose = require('mongoose');
var url = "mongodb://admin:123456a@ds255930.mlab.com:55930/assignment";
var Schema = mongoose.Schema;
// model
var noteSchema = new Schema({
    title: String,
    content: String,
    date: String,
    color: String
});

module.exports.initialize = function() {
    return new Promise(function(resolve, reject) {
        var conn = mongoose.createConnection(url);
        conn.once('open', ()=>{
            var noteModel = conn.model('notes', noteSchema);
            noteModel.find({}).sort({date: -1}).exec(function(err, data) {
                resolve(data);
            });
        });
    });
}

module.exports.deleteNote = function(id) {
    return new Promise(function(resolve, reject) {
        var conn = mongoose.createConnection(url);
        var ObjectId = require('mongodb').ObjectID;
        conn.once('open', ()=>{
            conn.collection('notes').deleteOne({_id: ObjectId(id)}, function(err, data) {
                resolve();
            });
        });
    });
}
module.exports.addNote = function(data) {
    return new Promise(function(resolve, reject) {
        var conn = mongoose.createConnection(url);
        var moment = require('moment');
        var _today = moment();
        var myobj = { 
            title: data.title,
            content: data.content,
            date: _today.format('YYYY-MM-DD HH:mm:ss'),
            color: data.color
        };
        conn.once('open', ()=>{
            conn.collection('notes').insert(myobj, function(err, data) {
                resolve();
            });
        });
    });
}
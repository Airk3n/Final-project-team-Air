var express = require("express");
var HTTP_PORT = process.env.PORT || 8080;
var app = express();
var hbs = require("hbs");
var path = require("path");
var bodyParser = require('body-parser');

var data_service = require("./data-service.js");

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine','hbs');
app.engine('hbs',hbs.__express);

app.get("/", function(req,res){
    data_service.initialize(req.params.empNum).then((data) => {
        res.render('index', {memo: data});
    }).catch((err) => {
        res.status(500).send("Unable to read data");
    });
});

app.get("/index", function(req,res){
    data_service.initialize().then((data) => {
        res.render('index', {memo: data});
    }).catch((err) => {
        res.status(500).send("Unable to read data");
    });
});
app.get("/delete/:id", function (req, res){
    data_service.deleteNote(req.params.id).then((data) => {
        res.redirect("/");
    }).catch((err) => {
        res.status(500).send("Unable to Remove Employee / Employee not found");
    });
});
app.post("/add", function(req, res) {
    if (req.body) {
        data_service.addNote(req.body).then((data) => {
        res.redirect("/");
    }).catch((err) => {
        console.log(err);
    });
}
});
app.listen(HTTP_PORT);
console.log("Express http server listening on " + HTTP_PORT);
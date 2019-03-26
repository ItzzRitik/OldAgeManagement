const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const clear = require('clear');
const git = require('simple-git/promise')();

var call = 0;
app.set("view engine", "ejs");
app.use('/public', express.static('public'));

const dbOptions = { useNewUrlParser: true, reconnectTries: Number.MAX_VALUE, poolSize: 10 };
mongoose.connect(require("./mongo"), dbOptions).then(
    () => { console.log(">  Connection Established"); },
    e => { console.log(">  Connection Failed \n>  " + e); }
);

app.use(bodyparser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var User = mongoose.model("user", new mongoose.Schema({
    email: String,
    pass: String,
    name: String,
    age: String,
    gender: String,
    address: String,
    disease: String
}));

app.get("/git", function(req, res) {
    var m = req.query.m;
    console.log("\n" + ++call + ") Pushing to Github");
    git.add('.')
        .then(
            (addSuccess) => {
                console.log(">  Changes Successfully Added to Stack");
            }, (failedAdd) => {
                console.log(">  Changes Adding Failed\n>  " + failedAdd);
            });
    git.commit(m)
        .then(
            (successCommit) => {
                console.log(">  Changes Successfully Commited\n   >  Message : \"" + m + "\"");
            }, (failed) => {
                console.log(">  Changes Commit Failed\n>  " + failed);
            });
    git.push('origin', 'master')
        .then((success) => {
            console.log(">  Changes Successfully Pushed to Origin Master");
        }, (failed) => {
            console.log(">  Changes Push Failed\n>  " + failed);
        });
    res.send("1");
});

app.post("/signup", function(req, res) {
    console.log("\n" + ++call + ") User Creation Started");
    User.create({
        email: req.body.email,
        pass: req.body.pass,
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        address: req.body.address,
        disease: req.body.disease
    }, function(e, user) {
        if (e) {
            res.send("0");
            console.log(">  Error While Creating New User\n>  " + e);
        }
        else {
            console.log(">  Successfully Created New User\n>  " + user)
            res.send("1");
        }
    });
});

app.get("/login", function(req, res) {
    res.render("login", {});
});
app.get("*", function(req, res) {
    res.redirect("login");
});

app.listen(process.env.PORT, process.env.IP, function() {
    clear();
    console.log("\n" + ++call + ") Starting Server");
    console.log(">  Server is Listening");
    console.log("\n" + ++call + ") Connection to MongoDB Atlas Server");
});

var express = require('express');
var app = express();
var port = 3000;
var db = require('./db');
var bodyParser = require('body-parser');
var userRouter = require('./routers/user.route');
var productRouter = require('./routers/product.route');

app.use(express.static("public"));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.set("view engine", "pug");
app.set("views", "./view");
app.get("/", function(req, res) {
    res.render("index", {
        name: "aaaaaa"
    });
});

app.use("/users", userRouter);
app.use("/products", productRouter);

app.listen(port, function() {
    console.log("server listing on port " + port);
});
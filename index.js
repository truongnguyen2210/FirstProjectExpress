//https://www.npmjs.com/package/dotenv
// create file .env and add this  file in gitignore
require("dotenv").config();
var express = require('express');
var app = express();
var port = 3000;

var md5 = require('md5');
var db = require('./db');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var userRouter = require('./routers/user.route');
var productRouter = require('./routers/product.route');
var authRouter = require('./routers/auth.route');
var cartRouter = require('./routers/cart.route');

var authMiddleware = require('./validate/auth.validate');
var sessionMiddleware = require('./validate/session.validate');

app.use(express.static("public"));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(sessionMiddleware);

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


app.set("view engine", "pug");
app.set("views", "./view");
app.get("/", function(req, res) {
    res.render("index", {
        name: "aaaaaa"
    });
});

app.use("/users", authMiddleware.requiredAuth, userRouter);
app.use("/products", productRouter);
app.use("/cart", cartRouter);
app.use("/auth", authRouter);

app.listen(port, function() {
    console.log("server listing on port " + port);
});
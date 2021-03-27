var db = require('../db')
module.exports.postLogin = function(req, res, next) {
    var phone = req.body.phone;
    var password = req.body.password;
    var user = db.get("users").find({ phone: phone }).value();
    if (!user) {
        res.render('auth/login', {
            errors: ["user does not exist"],
            values: req.body
        });
        return;
    }
    if (user.password !== password) {
        res.render('auth/login', {
            errors: ["password is wrong!"],
            values: req.body
        });
        return;
    }
    res.cookie("userId", user.id);
    next();
}
module.exports.requiredAuth = function(req, res, next) {
    console.log(req.cookies.userId);
    if (!req.cookies.userId) {
        res.redirect('/auth/login')
        return;
    }
    var user = db.get("users").find({ id: req.cookies.userId }).value();
    if (!user) {
        res.redirect('/auth/login')
        return;
    }
    next();
}
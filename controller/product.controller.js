var db = require('../db')

module.exports.index = function(req, res) {
    res.render("products/index", {
        products: db.get("products").value()
    });
};
module.exports.search = function(req, res) {
    var q = req.query.q;
    var marchedUsers = db.get("users").value().filter(function(user) {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    res.render("users/index", {
        users: marchedUsers
    });
};
module.exports.create = function(req, res) {
    res.render("users/create", {});
};
module.exports.doCreate = function(req, res) {
    req.body.id = shortid.generate();
    db.get('users').push(req.body).write();
    res.redirect('/users');
};
module.exports.viewUser = function(req, res) {
    var id = req.params.id;
    var user = db.get("users").find({ id: id }).value();
    res.render("users/view", {
        user: user
    });
};
var db = require('../db')
    //paginations
module.exports.index = function(req, res) {
    var page = parseInt(req.query.page) || 1;
    var perPage = 8;
    var start = (page - 1) * perPage;
    var end = page * perPage;
    // var drop = (page - 1) * perPage;//c2
    res.render("products/index", {
        products: db.get("products").value().slice(start, end) //c1
            // products: db.get("products").drop(drop).take(perPage).value()//c2

    });
};
module.exports.search = function(req, res) {
    var q = req.query.q;
    var marchedProducts = db.get("products").value().filter(function(product) {
        return product.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    res.render("products/index", {
        products: marchedProducts
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
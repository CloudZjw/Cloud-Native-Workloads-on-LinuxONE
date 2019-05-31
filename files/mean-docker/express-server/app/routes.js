var User = require('./models/user');
var Wish = require('./models/wish')

function getUsers(res) {
    User.find(function (err, users) {

        if (err)
            res.send(err);

        res.json(users);
    });
};

function getWishes(res) {
    Wish.find(function (err, wishes) {
        if (err)
            res.send(err);
        res.json(wishes);
    });
};

module.exports = function (app) {
    app.get('/api/users', function (req, res) {
        // use mongoose to get all todos in the database
        getUsers(res);
    });

    app.get('/api/wishes', function (req, res) {
        // use mongoose to get all todos in the database
        getWishes(res);
    });

    app.post('/api/users', function (req, res) {
        User.create({
            user_name: req.body.user_name,
            code: req.body.code,
            email: req.body.email,
            rank: 0,
            done: false
        }, function (err, user) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            getUsers(res);
        });

    });

    app.post('/api/wishes', function (req, res) {

        // create a todo, information comes from AJAX request from Angular
        Wish.create({
            user_name: req.body.user_name,
            receiver: req.body.receiver,
            title: req.body.title,
            description: req.body.description,
            bonus: req.body.bonus,
            done: false
        }, function (err, wish) {
            if (err)
                res.send(err);
        });

    });

    // delete a todo
    app.delete('/api/todos/:todo_id', function (req, res) {
        Todo.remove({
            _id: req.params.todo_id
        }, function (err, todo) {
            if (err)
                res.send(err);

            getTodos(res);
        });
    });

    app.delete('/api/users/:user_id', function (req, res) {
        User.remove({
            _id: req.params.user_id
        }, function (err, user) {
            if (err)
                res.send(err);

            getUsers(res);
        });
    });

    app.delete('/api/wishes/:wish_id', function (req, res) {
        Wish.remove({
            _id: req.params.wish_id
        }, function (err, wish) {
            if (err)
                res.send(err);

            getWishes(res);
        });
    });
};
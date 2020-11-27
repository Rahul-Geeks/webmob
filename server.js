require("./db.conn");
const express = require("express");
const mongoose = require("mongoose");
const async = require("async");

const app = express();
const User = mongoose.model("User");
const Product = mongoose.model("Product");

// User registration
app.post("/user", (req, res) => {
    User.create({
        'name': req.body.name,
        'email': req.body.email,
        'password': req.body.password
    }, (error, userObj) => {
        if (error)
            res.status(500).json({ 'message': 'Error while registetring a user', 'error': error });
        else {
            res.status(200).json(userObj);
        }
    });
});

// User sign in
app.get('/user', (req, res) => {
    async.waterfall([
        (callback) => {
            User.findOne({ 'email': req.query.email }).exec((error, userObj) => {
                if (error)
                    callback({ 'message': 'Error while getting a user', 'error': error }, null);
                else if (!userObj)
                    callback({ 'message': 'User is not registered' }, null);
                else {
                    callback(null, userObj);
                }
            });
        },

        (userObj, callback) => {
            if (userObj.password == req.query.password) {
                callback(null, userObj);
            }
        }
    ], (error, userObj) => {
        if (error)
            res.status(500).json({ 'message': 'Error while login a user', 'error': error });
        else {
            res.status(200).json(userObj);
        }
    });
});

app.patch("/product", (req, res) => {
    Product.findOneAndUpdate({ "_id": req.query.productId }, {
        "$set": {
            'name': req.body.name,
            'price': req.body.price,
            'category': req.body.category,
            'qty': req.body.qty
        }
    }).exec((error, productObj) => {
        if (error)
            res.status(500).json({ 'message': 'Error while updating a product', 'error': error });
        else {
            res.status(200).json(productObj);
        }
    });
});

app.get("/products", (req, res) => {
    Product.find({}).exec((error, products) => {
        if (error)
            res.status(500).json({ 'message': 'Error while getting products', 'error': error });
        else {
            res.status(200).json(products);
        }
    });
});

app.listen(8000, (error) => {
    if (error)
        console.log("ERROR WHILE STARTING THE APP", error);
    else {
        console.log("Connected with server at port 8000");
    }
});
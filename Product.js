const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let ProductSchema = new Schema({
    id: String,
    sku: String,
    name: String,
    price: Number,
    category: String,
    qty: String,
    image: String
});

module.exports = mongoose.model("Product", ProductSchema);